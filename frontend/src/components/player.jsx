import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, List } from 'lucide-react';
import cold from '../assets/coldoutside.jpeg';
import audioFile from '../assets/babyitscold.mp3'; // Import your audio file

const Player = () => {
  const [isPlaying, setIsPlaying] = useState(false); // Track if the song is playing
  const [volume, setVolume] = useState(100); // Track volume level
  const [currentTime, setCurrentTime] = useState(0); // Track current playback time
  const [duration, setDuration] = useState(0); // Track audio duration
  const audioRef = useRef(null); // Reference to the audio element

  // Toggle play/pause
  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  // Handle volume change
  const handleVolumeChange = (e) => {
    setVolume(e.target.value);
    audioRef.current.volume = e.target.value / 100; // Update audio volume
  };

  // Update playback time
  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  // Set audio duration once the audio is loaded
  const handleLoadedMetadata = () => {
    setDuration(audioRef.current.duration);
  };

  // Restart song (skip back to the beginning)
  const restartSong = () => {
    audioRef.current.currentTime = 0; // Reset playback to start
    if (!isPlaying) {
      audioRef.current.play(); // Automatically start playing if it's not already playing
      setIsPlaying(true);
    }
  };

  // Fast forward song by 5 seconds
  const fastForward = () => {
    const newTime = audioRef.current.currentTime + 5; // Increase current time by 5 seconds
    if (newTime < duration) {
      audioRef.current.currentTime = newTime; // Set new time if it's within bounds
    } else {
      audioRef.current.currentTime = duration; // Otherwise, go to the end of the song
    }
  };

  // Sync volume and playback changes when component re-renders
  useEffect(() => {
    audioRef.current.volume = volume / 100; // Set initial volume
  }, [volume]);

  return (
    <div className="h-20 bg-gray-900 border-t border-gray-800 px-4 flex items-center justify-between">
      <div className="flex items-center w-1/4 space-x-4">
        <img
          src={cold}
          alt="Album cover"
          className="h-8 w-8 rounded object-cover" // Smaller image size
        />
        <div className="ml-4">
          <h4 className="text-white text-sm">Baby, It's Cold Outside</h4>
          <p className="text-gray-400 text-xs">Idina Menzel ft. Michael Buble</p>
        </div>
      </div>

      <div className="flex flex-col items-center w-2/4">
        <div className="flex items-center space-x-6">
          <button
            className="text-gray-400 hover:text-white"
            onClick={restartSong} // Call restartSong instead of skipping back
          >
            <SkipBack size={20} />
          </button>
          <button
            className="w-8 h-8 flex items-center justify-center bg-white rounded-full hover:scale-105"
            onClick={togglePlayPause} // Toggle play/pause on button click
          >
            {isPlaying ? <Pause size={20} /> : <Play size={20} />}
          </button>
          <button
            className="text-gray-400 hover:text-white"
            onClick={fastForward} // Fast forward by 5 seconds
          >
            <SkipForward size={20} />
          </button>
        </div>
        <div className="w-full mt-2 flex items-center space-x-2">
          <span className="text-xs text-gray-400">
            {new Date(currentTime * 1000).toISOString().substr(14, 5)} {/* Format current time */}
          </span>
          <div className="flex-1 h-1 bg-gray-600 rounded-full">
            <div
              className="h-full bg-white rounded-full"
              style={{ width: `${(currentTime / duration) * 100}%` }}
            ></div> {/* Playback progress */}
          </div>
          <span className="text-xs text-gray-400">
            {new Date(duration * 1000).toISOString().substr(14, 5)} {/* Format duration */}
          </span>
        </div>
      </div>

      <div className="flex items-center space-x-4 w-1/4 justify-end">
        <List className="text-gray-400 hover:text-white" />
        <Volume2 className="text-gray-400 hover:text-white" />
        <input
          type="range"
          min="0"
          max="100"
          value={volume}
          onChange={handleVolumeChange} // Handle volume change
          className="w-24"
        />
      </div>

      {/* Hidden Audio Element */}
      <audio
        ref={audioRef}
        src={audioFile} // Path to your audio file
        onTimeUpdate={handleTimeUpdate} // Update playback time
        onLoadedMetadata={handleLoadedMetadata} // Set duration when metadata is loaded
      />
    </div>
  );
};

export default Player;
