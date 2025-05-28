import './Sidebar.css'; 
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Search, Library, Heart, Settings } from 'lucide-react';
import spotify from '../assets/spotify.jpg';

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { icon: <Home size={24} />, text: 'Home', path: '/home' },
    { icon: <Search size={24} />, text: 'Search', path: '/search' },
    { icon: <Library size={24} />, text: 'Your Library', path: '/library' },
    { icon: <Heart size={24} />, text: 'Liked Songs', path: '/favorites' },
    { icon: <Settings size={24} />, text: 'Settings', path: '/settings' },
  ];

  return (
    <div className="w-64 bg-black p-6">
      <div className="mb-8">
        <img src={spotify} alt="Spotify" className="w-32" />
      </div>
      <nav>
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center space-x-4 py-3 px-4 rounded-lg transition-colors ${
              location.pathname === item.path
                ? 'bg-gray-800 text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            {item.icon}
            <span>{item.text}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;