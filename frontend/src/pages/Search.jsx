import React, { useState, useRef } from 'react';
import Sidebar from '../components/Sidebar';
import { Search as SearchIcon } from 'lucide-react';
import song1Image from '../assets/song1.jpeg'; // Example image
import song2Image from '../assets/song2.jpeg'; // Example image
import song1Audio from '../assets/baby.mp3'; // Example audio file
import song2Audio from '../assets/britney.mp3'; // Example audio file

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([
    {
      id: 1,
      title: 'Baby ft. Ludacris',
      artist: 'Justin Bieber',
      image: song1Image, // Add image
      audioUrl: song1Audio, // Add audio URL
    },
    {
      id: 2,
      title: 'Baby One More Time',
      artist: 'Britney Spears',
      image: song2Image, // Add image
      audioUrl: song2Audio, // Add audio URL
    },
  ]);
  
  const [isPlaying, setIsPlaying] = useState(null); // Track which song is playing
  const [currentAudio, setCurrentAudio] = useState(null); // Audio instance for the current track
  const audioRefs = useRef([]); // To store references to the audio elements

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    // Simulate search logic here (filtering searchResults, making API calls, etc.)
  };

  // Handle play/pause logic for each song
  const handlePlayPause = (index, audioUrl) => {
    if (isPlaying === index) {
      // Pause the current track if it is already playing
      audioRefs.current[index].pause();
      setIsPlaying(null); // Reset playing state
      setCurrentAudio(null); // Reset current audio instance
    } else {
      // Stop the previous track if it's playing
      if (isPlaying !== null) {
        audioRefs.current[isPlaying].pause();
      }

      // Play the new track
      setIsPlaying(index);
      setCurrentAudio(audioRefs.current[index]); // Set current audio instance
      audioRefs.current[index].src = audioUrl; // Set the new audio URL
      audioRefs.current[index].play(); // Play the song
    }
  };

  return (
    <div className="flex h-screen bg-black">
      <Sidebar />
      <div className="flex-1 p-8 bg-[#121212]">
        {/* Search Input */}
        <div className="mb-8">
          <div className="relative">
            <SearchIcon className="absolute left-4 top-3 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="What do you want to listen to?"
              value={searchQuery}
              onChange={handleSearch}
              className="w-full pl-12 pr-4 py-3 bg-[#333333] rounded-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1db954] text-lg"
            />
          </div>
        </div>

        {/* Search Results */}
        {searchQuery ? (
          <div className="mt-8">
            <h2 className="text-2xl font-semibold text-white mb-4">Search Results</h2>
            {searchResults.length > 0 ? (
              <ul className="space-y-4">
                {searchResults.map((result, index) => (
                  <li
                    key={result.id}
                    className="flex items-center p-4 bg-[#1e1e1e] rounded-lg hover:bg-[#2a2a2a] transition"
                  >
                    <img
                      src={result.image}
                      alt={result.title}
                      className="rounded-md mr-4"
                      style={{ width: '50px', height: '50px' }} // Inline styles to ensure size
                    />
                    

                    <div className="flex-grow">
                      <p className="text-white font-semibold">{result.title}</p>
                      <p className="text-gray-400">{result.artist}</p>
                    </div>
                    <button
                      onClick={() => handlePlayPause(index, result.audioUrl)}
                      className="px-4 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition"
                    >
                      {isPlaying === index ? 'Pause' : 'Play'}
                    </button>
                    {/* Hidden audio element for each track */}
                    <audio
                      ref={(el) => (audioRefs.current[index] = el)} // Store ref for each audio element
                      onEnded={() => setIsPlaying(null)} // Reset playing state when track ends
                    >
                      <source src={result.audioUrl} />
                    </audio>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-400">No results found.</p>
            )}
          </div>
        ) : (
          <div className="mt-8 text-gray-400 text-center">
            {/* Placeholder for empty state */}
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
