import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login as authlogin } from '../store/authSlice'
import { Button, Input, BlogLogo } from './index'
import { useDispatch } from 'react-redux'
import authService from '../appwrite/auth'
import { useForm } from 'react-hook-form'

function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { register, handleSubmit } = useForm()
    const [error, setError] = useState(null)
    const [login, setLogin] = useState('Login')

    const signin = async (data) => {
        setError("");
        setLogin("Logging in...")

        try {
            // First check if there's already a session
            let session;
            try {
                const current = await authService.getCurrentUser();
                if (!current) {
                    session = await authService.login(data);
                } else {
                    session = true; // already logged in
                }
            } catch (err) {
                session = await authService.login(data);
                setLogin("Login")
            }

            if (session) {
                const userData = await authService.getCurrentUser();
                if (userData) {
                    dispatch(authlogin(userData));
                    navigate("/");
                }
            }
        } catch (error) {
            setError(error?.message || "Login failed. Try again.");
            setLogin("Login"); 
        }
    };

    return (
        <div className="flex items-center justify-center w-full min-h-[calc(100vh-150px)] bg-gray-200">
            <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md border border-gray-200">

                <div className="flex justify-center mb-4">
                    <BlogLogo width="24px" />
                </div>

                <h2 className="text-2xl font-semibold text-center">Sign in to your account</h2>

                <p className="mt-2 text-center text-sm text-gray-600">
                    Don’t have any account?
                    <Link to="/signup" className="text-blue-600 hover:underline">Sign Up</Link>
                </p>

                {error && (
                    <p className="mt-6 text-center text-red-500">{error}</p>
                )}


                <form className="mt-6 space-y-4" onSubmit={handleSubmit(signin)}>

                    <Input
                        label="Email..."
                        type="email"
                        placeholder="Enter your email"
                        {...register("email", {
                            required: true,
                            validate: {
                                matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                    "Email address must be a valid address",
                            }
                        })}
                    />
                    <Input
                        label="Password: "
                        type="password"
                        placeholder="Enter your password"
                        {...register("password", {
                            required: true,
                        })}
                    />

                    <Button type="submit">
                        {login}
                    </Button>
                </form>
            </div>
        </div>

    )
}

export default Login