import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';

const Settings = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Settings updated successfully!');
  };

  return (
    <div className="flex h-screen bg-black">
      <Sidebar />
      <div className="flex-1 p-6 bg-gray-900 text-white">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-center">Settings</h1>
          <p className="text-gray-400 text-center mt-2">
            Update your profile and account preferences
          </p>

          {/* Settings Form */}
          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div>
              <label className="block text-gray-400 mb-2">Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full p-3 bg-gray-800 text-white rounded-md focus:outline-none focus:ring focus:ring-green-500"
                placeholder="Enter your username"
              />
            </div>
            <div>
              <label className="block text-gray-400 mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 bg-gray-800 text-white rounded-md focus:outline-none focus:ring focus:ring-green-500"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label className="block text-gray-400 mb-2">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-3 bg-gray-800 text-white rounded-md focus:outline-none focus:ring focus:ring-green-500"
                placeholder="Enter your password"
              />
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="px-6 py-3 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
              >
                Save Changes
              </button>
            </div>
          </form>

          {/* Other Settings */}
          <div className="mt-10 text-center">
            <h2 className="text-2xl font-bold">Other Settings</h2>
            <ul className="mt-4 space-y-4">
              <li>
                <button
                  className="w-full p-3 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition"
                >
                  Manage Subscription
                </button>
              </li>
              <li>
                <button
                  className="w-full p-3 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition"
                >
                  Privacy Settings
                </button>
              </li>
              <li>
                <button
                  className="w-full p-3 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
