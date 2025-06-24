import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { login as authlogin } from '../store/authSlice';
import { useDispatch } from 'react-redux';
import authService from '../appwrite/auth';
import { Button, Input, BlogLogo } from './index';

function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState(null);
  const [signup, setSignup] = useState('Register');
 
  const create = async (data) => {
  setError('');
  setSignup('Creating Account...')
  try {
    const account = await authService.createAccount(data);

    if (account) {
      const userData = await authService.getCurrentUser();
      if (userData) {
        dispatch(authlogin({ userData }));
        navigate('/');
      }
    }
  } catch (error) {
    setError(error.message || 'Signup failed. Try again.');
  }
};


  return (
    <div className="flex items-center justify-center w-full min-h-[calc(100vh-150px)] bg-gray-200">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md border border-gray-200">
        
        {/* Logo */}
        <div className="flex justify-center mb-4">
          <BlogLogo width="24px" />
        </div>

        {/* Heading */}
        <h2 className="text-2xl font-semibold text-center">Create a new account</h2>

        {/* Login Link */}
        <p className="mt-2 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 hover:underline">Login</Link>
        </p>

        {/* Error */}
        {error && <p className="mt-6 text-center text-red-500">{error}</p>}

        {/* Form */}
        <form className="mt-6 space-y-4" onSubmit={handleSubmit(create)}>
          <Input
            label="Name"
            type="text"
            placeholder="Enter your name"
            {...register('name', { required: true })}
          />
          <Input
            label="Email"
            type="email"
            placeholder="Enter your email"
            {...register('email', {
              required: true,
              validate: {
                matchPattern: (value) =>
                  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                  'Email address must be a valid address',
              },
            })}
          />
          <Input
            label="Password"
            type="password"
            placeholder="Create a password"
            {...register('password', { required: true, minLength: 6 })}
          />

          <Button type="submit">{signup}</Button>
        </form>
      </div>
    </div>
  );
}

export default Signup;