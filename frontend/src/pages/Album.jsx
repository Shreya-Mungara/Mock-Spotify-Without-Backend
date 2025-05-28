import React, { useState, useRef } from 'react';
import Sidebar from '../components/Sidebar';
import dwn from '../assets/dawnfm.jpeg';

// Add the corresponding audio files for each track
import track1 from '../assets/dwn1.mp3';
import track2 from '../assets/dwn2.mp3';
import track3 from '../assets/dwn3.mp3';
import track4 from '../assets/dwn4.mp3';
import track5 from '../assets/dwn5.mp3';
import track6 from '../assets/dwn6.mp3';
import track7 from '../assets/dwn7.mp3';
import track8 from '../assets/dwn8.mp3';
import track9 from '../assets/dwn9.mp3';
import track10 from '../assets/dwn10.mp3';

const Album = () => {
  const [isPlaying, setIsPlaying] = useState(null); // Track which song is playing
  const audioRefs = useRef([]); // Store refs for each audio element

  // Array of track details
  const tracks = [
    { title: 'A Tale By Quincy', audioUrl: track1 },
    { title: 'Dawn FM', audioUrl: track2 },
    { title: 'Dont Break My Heart', audioUrl: track3 },
    { title: 'Every Angel is Terrifying', audioUrl: track4 },
    { title: 'Here We Go... Again (feat. Tyler, the Creator)', audioUrl: track5 },
    { title: 'How Do I Make You Love Me', audioUrl: track6 },
    { title: 'I Heard Youre Married (feat. Lil Wayne)', audioUrl: track7 },
    { title: 'Is There Someone Else?', audioUrl: track8 },
    { title: 'Less Than Zero', audioUrl: track9 },
    { title: 'Out of Time', audioUrl: track10 },
  ];

  // Handle play/pause for each track
  const handlePlayPause = (index, audioUrl) => {
    if (isPlaying === index) {
      // Pause the current track
      audioRefs.current[index].pause();
      setIsPlaying(null); // Reset playing state
    } else {
      // Pause the other track if it's playing
      if (isPlaying !== null) {
        audioRefs.current[isPlaying].pause();
      }

      // Play the new track
      setIsPlaying(index);
      audioRefs.current[index].src = audioUrl; // Set the new audio URL
      audioRefs.current[index].play(); // Play the song
    }
  };

  return (
    <div className="flex h-screen bg-black">
      {/* Sidebar Component */}
      <Sidebar />
      
      {/* Main Content */}
      <div className="flex-1 p-6 bg-gray-900 text-white overflow-y-auto">
        {/* Album Header */}
        <div className="flex items-center gap-6">
          <img
            src={dwn}
            alt="Album Cover"
            className="w-40 h-40 object-cover rounded-md"
          />
          <div>
            <h1 className="text-4xl font-bold">Dawn FM</h1>
            <p className="text-gray-400 mt-2">The Weeknd</p>
          </div>
        </div>

        {/* Tracks List */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold">Tracks</h2>
          <ul className="mt-4">
            {tracks.map((track, index) => (
              <li
                key={index}
                className="flex justify-between py-2 px-4 bg-gray-800 rounded-md hover:bg-gray-700 transition mt-2"
              >
                <span>{track.title}</span>
                <div className="flex items-center">
                  <button
                    onClick={() => handlePlayPause(index, track.audioUrl)}
                    className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white ml-4 hover:scale-105 transition-transform"
                  >
                    {isPlaying === index ? (
                      <span>Pause</span> // Show Pause button if the track is playing
                    ) : (
                      <span>Play</span> // Show Play button if the track is not playing
                    )}
                  </button>
                  {/* Hidden audio element for each track */}
                  <audio
                    ref={(el) => (audioRefs.current[index] = el)} // Store ref for each audio element
                    onEnded={() => setIsPlaying(null)} // Reset playing state when track ends
                  >
                    <source src={track.audioUrl} />
                  </audio>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Album;
