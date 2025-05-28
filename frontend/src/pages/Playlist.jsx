import React, { useState, useRef } from 'react';
import { Play, Pause, Clock } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import heart from '../assets/likedsongs.jpeg';
import pl1 from '../assets/playlist1.jpeg';
import pl2 from '../assets/playlist2.jpeg';
import pl3 from '../assets/playlist3.jpeg';

// Import audio files
import song1Audio from '../assets/late.mp3'; // Replace with actual paths
import song2Audio from '../assets/bruno.mp3'; // Replace with actual paths
import song3Audio from '../assets/summer.mp3'; // Replace with actual paths

const Playlist = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(null);
  const audioRef = useRef(null);

  const playlist = {
    name: 'My Favorite Playlist',
    description: 'A collection of my favorite songs',
    image: heart,
    songs: [
      {
        id: 1,
        title: 'Late Night Talking',
        artist: 'Harry Styles',
        album: 'Harrys House',
        image: pl1,
        duration: '3:45',
        audioUrl: song1Audio,
      },
      {
        id: 2,
        title: 'Thats What I Like',
        artist: 'Bruno Mars',
        album: '24K Magic',
        image: pl2,
        duration: '4:20',
        audioUrl: song2Audio,
      },
      {
        id: 3,
        title: 'Feels Like Summer',
        artist: 'Childish Gambino',
        album: 'Summer Pack',
        image: pl3,
        duration: '2:50',
        audioUrl: song3Audio,
      },
    ],
  };

  const playSong = (index) => {
    if (currentSongIndex === index && isPlaying) {
      // If the same song is clicked, toggle pause
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      // Play the selected song
      setCurrentSongIndex(index);
      audioRef.current.src = playlist.songs[index].audioUrl;
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const playNextSong = () => {
    const nextIndex = currentSongIndex + 1;
    if (nextIndex < playlist.songs.length) {
      setCurrentSongIndex(nextIndex);
      audioRef.current.src = playlist.songs[nextIndex].audioUrl;
      audioRef.current.play();
      setIsPlaying(true);
    } else {
      // If we reach the end of the playlist, stop the music
      setIsPlaying(false);
    }
  };

  return (
    <div className="flex h-screen bg-black">
      <Sidebar />
      <div className="flex-1">
        {/* Playlist Header */}
        <div className="flex p-8 bg-gradient-to-b from-gray-800 to-black">
          <img
            src={playlist.image}
            alt={playlist.name}
            className="w-60 h-60 shadow-lg"
            onError={(e) => {
              e.target.src = '/default-playlist-cover.jpg';
            }}
          />
          <div className="ml-8 flex flex-col justify-end">
            <p className="text-sm text-gray-400">PLAYLIST</p>
            <h1 className="text-5xl font-bold text-white mt-2">{playlist.name}</h1>
            <p className="text-gray-400 mt-8">{playlist.description}</p>
          </div>
        </div>

        {/* Playlist Songs */}
        <div className="p-8">
          <table className="w-full">
            <thead>
              <tr className="text-gray-400 text-sm border-b border-gray-800">
                <th className="text-left pb-2">#</th>
                <th className="text-left pb-2">TITLE</th>
                <th className="text-left pb-2">ALBUM</th>
                <th className="text-left pb-2">
                  <Clock size={16} />
                </th>
                <th className="text-left pb-2">PLAY</th>
              </tr>
            </thead>
            <tbody>
              {playlist.songs.map((song, index) => (
                <tr
                  key={song.id}
                  className="text-gray-400 hover:bg-gray-800"
                >
                  <td className="py-4">{index + 1}</td>
                  <td className="flex items-center space-x-4">
                    {/* Song Image */}
                    <img
                      src={song.image}
                      alt={song.title}
                      className="w-12 h-12 rounded"
                      onError={(e) => {
                        e.target.src = '/default-song-cover.jpg'; // Fallback if image fails
                      }}
                    />
                    <div>
                      <p className="text-white">{song.title}</p>
                      <p className="text-sm">{song.artist}</p>
                    </div>
                  </td>
                  <td>{song.album}</td>
                  <td>{song.duration}</td>
                  <td>
                    <button
                      onClick={() => playSong(index)} // Trigger play/pause on button click
                      className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center mb-8 hover:scale-105 transition-transform"
                    >
                      {currentSongIndex === index && isPlaying ? (
                        <Pause fill="white" size={24} />
                      ) : (
                        <Play fill="white" size={24} />
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Audio Element */}
        <audio
          ref={audioRef}
          onEnded={playNextSong} // Play the next song when the current one ends
        />
      </div>
    </div>
  );
};

export default Playlist;
