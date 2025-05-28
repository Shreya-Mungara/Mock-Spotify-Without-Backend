import React, { useState, useRef } from 'react';
import { Play, Pause } from 'lucide-react'; // Import the Pause icon from lucide-react

const SongCard = ({ song }) => {
  const [isPlaying, setIsPlaying] = useState(false); // Track the playing state
  const audioRef = useRef(null); // Reference to the audio element

  // Function to toggle play/pause
  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause(); // Pause the audio if it's playing
    } else {
      audioRef.current.play(); // Play the audio if it's paused
    }
    setIsPlaying(!isPlaying); // Toggle the isPlaying state
  };

  return (
    <div className="p-4 bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors group">
      <div className="relative">
        <div className="w-16 h-16 rounded-md overflow-hidden mb-4">
          <img
            src={song.coverUrl}
            alt={song.title}
            style={{ width: '120px', height: '120px', objectFit: 'cover', borderRadius: '8px' }}
          />
        </div>
        <button
          onClick={togglePlayPause} // Toggle play/pause on click
          className="absolute bottom-4 right-4 w-10 h-10 bg-green-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
        >
          {isPlaying ? (
            <Pause fill="white" size={20} /> // Show Pause icon when playing
          ) : (
            <Play fill="white" size={20} /> // Show Play icon when paused
          )}
        </button>
        {/* Hidden audio element that will be controlled by the button */}
        <audio ref={audioRef} src={song.audioUrl} />
      </div>
      <h3 className="text-white font-semibold truncate">{song.title}</h3>
      <p className="text-gray-400 text-sm truncate">{song.artist}</p>
    </div>
  );
};

export default SongCard;


