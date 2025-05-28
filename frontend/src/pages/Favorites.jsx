import React, { useState, useRef } from 'react';
import Sidebar from '../components/Sidebar';
import fav1 from '../assets/fav1.jpeg';
import fav2 from '../assets/fav2.jpeg';
import fav3 from '../assets/fav3.jpeg';
import fav4 from '../assets/fav4.jpeg';
import fav5 from '../assets/fav5.jpeg';
import fav6 from '../assets/fav6.jpeg';
import fav7 from '../assets/fav7.jpeg';
import fav8 from '../assets/fav8.jpeg';

// Add the corresponding audio files
import fav1Audio from '../assets/dangerously.mp3';
import fav2Audio from '../assets/lily.mp3';
import fav3Audio from '../assets/positions.mp3';
import fav4Audio from '../assets/taylor.mp3';
import fav5Audio from '../assets/chrisbrown.mp3';
import fav6Audio from '../assets/psycho.mp3';
import fav7Audio from '../assets/montenero.mp3';
import fav8Audio from '../assets/cabinfever.mp3';

const Favourites = () => {
  const [isPlaying, setIsPlaying] = useState(null);  // Tracks which song is currently playing
  const [currentAudio, setCurrentAudio] = useState(null);  // Tracks the current audio URL
  const audioRef = useRef(null);  // Reference to the audio element

  // Array of favourite songs
  const favourites = [
    { title: 'Dangerously', artist: 'Charlie Puth', image: fav1, audioUrl: fav1Audio },
    { title: 'Lily', artist: 'Alan Walker', image: fav2, audioUrl: fav2Audio },
    { title: 'Positions', artist: 'Ariana Grande', image: fav3, audioUrl: fav3Audio },
    { title: 'Are You Ready For It', artist: 'Taylor Swift', image: fav4, audioUrl: fav4Audio },
    { title: 'Take You Down', artist: 'Chris Brown', image: fav5, audioUrl: fav5Audio },
    { title: 'Psycho', artist: 'Post Malone', image: fav6, audioUrl: fav6Audio },
    { title: 'Montenero', artist: 'Lil Nas X', image: fav7, audioUrl: fav7Audio },
    { title: 'Cabin Fever', artist: 'Jaden Smith', image: fav8, audioUrl: fav8Audio },
  ];

  const handlePlayPause = (index, audioUrl) => {
    if (isPlaying === index) {
      // If the same song is clicked, pause it
      audioRef.current.pause();
      setIsPlaying(null);  // Stop the song
    } else {
      // If a different song is clicked, play it
      if (audioRef.current) {
        audioRef.current.pause();  // Stop the current song if any
      }
      setIsPlaying(index);  // Set the current song index
      setCurrentAudio(audioUrl);  // Set the new audio URL
      audioRef.current.src = audioUrl;  // Set the audio element's source
      audioRef.current.play();  // Play the song
    }
  };

  return (
    <div className="flex h-screen bg-black">
      {/* Sidebar Component */}
      <Sidebar />
      
      {/* Main Content */}
      <div className="flex-1 p-6 bg-gray-900 text-white overflow-y-auto">
        <div className="text-center">
          <h1 className="text-4xl font-bold">Favourites</h1>
          <p className="text-gray-400 mt-2">Your most loved songs and albums</p>
        </div>
        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-6">
          {favourites.map((fav, index) => (
            <div
              key={index}
              className="p-4 bg-gray-800 rounded-md hover:bg-gray-700 transition"
            >
              <img
                src={fav.image}
                alt={fav.title}
                className="w-full h-40 object-cover rounded"
              />
              <h3 className="text-lg font-medium mt-2">{fav.title}</h3>
              <p className="text-sm text-gray-400">{fav.artist}</p>

              {/* Play/Pause Button */}
              <button
                onClick={() => handlePlayPause(index, fav.audioUrl)}
                className="mt-4 w-14 h-14 bg-green-500 rounded-full flex items-center justify-center mb-8 hover:scale-105 transition-transform"
              >
                {isPlaying === index ? (
                  // If the song is playing, show the "Pause" button
                  <span className="text-white">Pause</span>
                ) : (
                  // Otherwise, show the "Play" button
                  <span className="text-white">Play</span>
                )}
              </button>

              {/* Audio Element */}
              {isPlaying === index && (
                <audio ref={audioRef} autoPlay>
                  <source src={currentAudio} />
                </audio>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Favourites;
