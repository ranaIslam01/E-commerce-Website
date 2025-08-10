import React, { useContext, useEffect, useState } from 'react';
import { Store } from '../context/Store';
import axios from 'axios';

export default function ProfilePage() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;

  useEffect(() => {
    // Could fetch recent orders here if needed in future
    console.log('Profile page loaded for user:', userInfo?.name);
  }, [userInfo]);

  // Profile Update
  const [name, setName] = useState(userInfo.name);
  const [email, setEmail] = useState(userInfo.email);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_API_URL || 'https://ecommerce-server-1-6mhy.onrender.com'}/api/users/profile`,
        { name, email, password },
        { withCredentials: true }
      );
      ctxDispatch({ type: 'USER_LOGIN', payload: data });
      localStorage.setItem('userInfo', JSON.stringify(data));
      alert('Profile updated successfully');
    } catch (err) {
      alert('Profile update failed');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[60vh] bg-gradient-to-br from-gray-100 to-gray-200 py-8 px-2">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-6 text-center">Update Profile</h2>
        <form onSubmit={submitHandler} className="space-y-5">
          <div>
            <label className="block mb-1 text-gray-700 font-semibold">Name</label>
            <input value={name} onChange={(e) => setName(e.target.value)} required className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition" />
          </div>
          <div>
            <label className="block mb-1 text-gray-700 font-semibold">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition" />
          </div>
          <div>
            <label className="block mb-1 text-gray-700 font-semibold">New Password</label>
            <input type="password" onChange={(e) => setPassword(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition" placeholder="Leave blank to keep current password" />
          </div>
          <div>
            <label className="block mb-1 text-gray-700 font-semibold">Confirm New Password</label>
            <input type="password" onChange={(e) => setConfirmPassword(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition" placeholder="Repeat new password" />
          </div>
          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-bold text-lg transition">Update</button>
        </form>
      </div>
    </div>
  );
}
