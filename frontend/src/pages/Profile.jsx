import React from 'react';
import Sidebar from '../components/Sidebar';

const Profile = () => {
  return (
    <div className="flex h-screen bg-black">
      <Sidebar />
      <div className="flex-1 p-6 bg-gray-900 text-white min-h-screen">
        {/* User Information Section */}
        <div className="flex items-center gap-6">
          <img
            src="https://via.placeholder.com/150"
            alt="User Avatar"
            className="w-24 h-24 object-cover rounded-full shadow-lg"
            onError={(e) => {
              e.target.src = '/default-avatar.jpg';
            }}
          />
          <div>
            <h1 className="text-4xl font-bold">User Name</h1>
            <p className="text-gray-400 mt-2">Premium Member</p>
          </div>
        </div>

        {/* User Playlists Section */}
        <div className="mt-10">
          <h2 className="text-2xl font-semibold">Your Playlists</h2>
          <ul className="mt-4">
            {Array(5)
              .fill()
              .map((_, index) => (
                <li
                  key={index}
                  className="py-2 px-4 bg-gray-800 rounded-md hover:bg-gray-700 transition mt-2 cursor-pointer"
                >
                  Playlist {index + 1}
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Profile;
