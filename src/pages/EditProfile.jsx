import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container } from '../components';
import authService from '../appwrite/auth';
import { login as loginAction } from '../store/authSlice';
import { useNavigate } from 'react-router-dom';

function EditProfile() {
  const userData = useSelector((state) => state.auth.userData);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (userData) {
      setName(userData.name || '');
      setEmail(userData.email || '');
    }
  }, [userData]);

  const handleSave = async (e) => {
    e.preventDefault();

    if (password && password !== confirmPass) {
      alert("Passwords do not match");
      return;
    }

    setSaving(true);

    try {
      // Update name
      if (name !== userData.name) {
        await authService.updateName(name);
      }

      // Update password if filled
      if (password) {
        await authService.updatePassword(password);
      }

      // Refresh Redux user info
      const updatedUser = await authService.getCurrentUser();
      dispatch(loginAction(updatedUser));

      alert('Profile updated successfully!');
      navigate('/profile');
    } catch (error) {
      console.error("Update failed:", error);
      alert("Something went wrong!");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Container>
      <div className="max-w-xl mx-auto mt-10 bg-white shadow-md rounded-xl p-6 min-h-[calc(100vh-205px)]">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Edit Profile</h2>

        <form onSubmit={handleSave} className="space-y-5">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Email (readonly) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={email}
              readOnly
              className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-md text-gray-500"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
            <input
              type="password"
              placeholder="Leave blank to keep current"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
            <input
              type="password"
              value={confirmPass}
              onChange={(e) => setConfirmPass(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* Save Button */}
          <div className="text-center">
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition disabled:opacity-60"
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </Container>
  );
}

export default EditProfile;