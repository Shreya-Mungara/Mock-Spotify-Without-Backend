import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Music, Mic2, Clock, Plus } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import heart from '../assets/likedsongs.jpeg';
import top from '../assets/tophits.jpeg';
import artist from '../assets/theweekend.jpeg';
import dwn from '../assets/dawnfm.jpeg';
import work from '../assets/workout.jpeg';

const Library = () => {
  const [activeFilter, setActiveFilter] = useState('playlists');
  const [libraryItems, setLibraryItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Sample data - In a real app, this would come from an API
  const sampleLibraryData = {
    playlists: [
      {
        id: 1,
        name: 'Liked Songs',
        type: 'playlist',
        owner: 'You',
        songCount: 245,
        image: heart, // Correctly assign the imported asset
        isLiked: true,
      },
      {
        id: 2,
        name: 'Your Top 2023',
        type: 'playlist',
        owner: 'Spotify',
        songCount: 100,
        image: top, // Correctly assign the imported asset
      },
      {
        id: 3,
        name: 'Workout Mix',
        type: 'playlist',
        owner: 'You',
        songCount: 50,
        image: work, // Correctly assign the imported asset
      },
    ],
    artists: [
      {
        id: 1,
        name: 'The Weeknd',
        type: 'artist',
        followerCount: '108M followers',
        image: artist, // Correctly assign the imported asset
      },
    ],
    albums: [
      {
        id: 1,
        name: 'Dawn FM',
        type: 'album',
        artist: 'The Weeknd',
        year: 2022,
        image: dwn, // Correctly assign the imported asset
      },
    ],
  };
  

  useEffect(() => {
    // Simulate API call
    const fetchLibraryItems = async () => {
      setIsLoading(true);
      try {
        setTimeout(() => {
          setLibraryItems(sampleLibraryData);
          setIsLoading(false);
        }, 500);
      } catch (error) {
        console.error('Error fetching library items:', error);
        setIsLoading(false);
      }
    };

    fetchLibraryItems();
  }, []);

  const filterButtons = [
    { id: 'playlists', label: 'Playlists', icon: Music },
    { id: 'artists', label: 'Artists', icon: Mic2 },
    { id: 'albums', label: 'Albums', icon: Clock },
  ];

  const getFilteredItems = () => {
    return libraryItems[activeFilter] || [];
  };

  const renderLibraryItem = (item) => {
    const commonClasses =
      "p-4 bg-gray-900 rounded-lg hover:bg-gray-800 transition-all duration-200 group relative";
  
    return (
      <Link key={item.id} to={`/${item.type}/${item.id}`} className={commonClasses}>
        <div className="relative">
          <img
            src={item.image} // Consistent usage of `item.image`
            alt={item.name}
            className="w-full aspect-square object-cover rounded-md shadow-lg mb-4"
            onError={(e) => {
              e.target.src = '/default-cover.jpg'; // Fallback image for missing or broken images
            }}
          />
          {item.type === 'playlist' && (
            <button className="absolute bottom-6 right-2 w-12 h-12 bg-green-500 rounded-full items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:scale-105 hidden md:flex">
              <Plus className="text-white" size={24} />
            </button>
          )}
        </div>
        <h3 className="text-white font-semibold truncate">{item.name}</h3>
        <p className="text-gray-400 text-sm truncate">
          {item.type === 'playlist' && `${item.owner} • ${item.songCount} songs`}
          {item.type === 'artist' && item.followerCount}
          {item.type === 'album' && `${item.artist} • ${item.year}`}
        </p>
      </Link>
    );
  };
  
  if (isLoading) {
    return (
      <div className="flex h-screen bg-black">
        <Sidebar />
        <div className="flex-1 p-8 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-black">
      <Sidebar />
      <div className="flex-1 p-8 overflow-y-auto">
        {/* Filter Buttons */}
        <div className="flex space-x-4 mb-8">
          {filterButtons.map((button) => {
            const Icon = button.icon;
            return (
              <button
                key={button.id}
                className={`px-4 py-2 rounded-full flex items-center space-x-2 transition-colors ${
                  activeFilter === button.id
                    ? 'bg-white text-black'
                    : 'bg-gray-800 text-white hover:bg-gray-700'
                }`}
                onClick={() => setActiveFilter(button.id)}
              >
                <Icon size={16} />
                <span>{button.label}</span>
              </button>
            );
          })}
        </div> 
<br></br>
        {/* Create Playlist Button */}
        <button className="mb-8 px-4 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg flex items-center space-x-2 transition-colors">
          <Plus size={20} />
          <span>Create Playlist</span>
        </button>

        {/* Library Items Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {getFilteredItems().map(renderLibraryItem)}
        </div>

        {/* Empty State */}
        {getFilteredItems().length === 0 && (
          <div className="text-center text-gray-400 py-12">
            <p className="text-lg">No {activeFilter} found in your library</p>
            {activeFilter === 'playlists' && (
              <button className="mt-4 px-6 py-2 bg-white text-black rounded-full hover:scale-105 transition-transform">
                Create Playlist
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Library;
