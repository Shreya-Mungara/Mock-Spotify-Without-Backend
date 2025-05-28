import React from 'react';
import SongCard from '../components/SongCard';
import ivy from '../assets/ivy.jpg';
import fev from '../assets/fevicol.jpg';
import chik from '../assets/chikini.jpg';
import ivyAudio from '../assets/ivy.mp3'; // Add the path to your audio file
import fevAudio from '../assets/fevicol.mp3'; // Add the path to your audio file
import chikAudio from '../assets/chikini.mp3'; // Add the path to your audio file

const Home = () => {
  const recentlyPlayed = [
    {
      id: 1,
      title: 'Ivy',
      artist: 'Frank Ocean',
      coverUrl: ivy,
      audioUrl: ivyAudio, // Audio file path
    },
    {
      id: 2,
      title: 'Fevicol Se',
      artist: 'Mamta Sharma ft. Wajid',
      coverUrl: fev,
      audioUrl: fevAudio, // Audio file path
    },
    {
      id: 3,
      title: 'Chikni Chameli',
      artist: 'Shreya Ghoshal',
      coverUrl: chik,
      audioUrl: chikAudio, // Audio file path
    },
  ];

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-white mb-8">Good evening</h1>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-4">Recently played</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {recentlyPlayed.map((song) => (
            <SongCard key={song.id} song={song} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
