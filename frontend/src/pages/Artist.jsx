import React from 'react';
import Sidebar from '../components/Sidebar';
import album1 from '../assets/album1.jpeg';
import album2 from '../assets/album2.jpeg';
import album3 from '../assets/album3.jpeg';
import album4 from '../assets/album4.jpeg';
import album5 from '../assets/album5.jpeg';
import album6 from '../assets/album6.jpeg';
import album7 from '../assets/album7.jpeg';
import album8 from '../assets/album8.jpeg';


const Artist = () => {
  // Array of album details
  const albums = [
    { title: 'Starboy', year: '2021', cover: album1 },
    { title: 'Beauty Behind The Madness', year: '2020', cover: album2 },
    { title: 'After Hours', year: '2019', cover: album3 },
    { title: 'The Idol', year: '2018', cover: album4 },
    { title: 'Starry Eyes', year: '2017', cover: album5 },
    { title: 'Kiss Land', year: '2016', cover: album6 },
    { title: 'Moth To A Flame', year: '2015', cover: album7 },
    { title: 'Hurricane', year: '2014', cover: album8 },
  ];
  

  return (
    <div className="flex h-screen bg-black">
      {/* Sidebar Component */}
      <Sidebar />
      
      {/* Main Content */}
      <div className="flex-1 p-6 bg-gray-900 text-white overflow-y-auto">
        <div className="text-center">
          <h1 className="text-4xl font-bold">The Weekend</h1>
          <p className="text-gray-400 mt-2">Popular artist on Spotify</p>
        </div>
        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-6">
          {/* Render albums dynamically */}
          {albums.map((album, index) => (
            <div
              key={index}
              className="p-4 bg-gray-800 rounded-md hover:bg-gray-700 transition"
            >
              <img
                src={album.cover}
                alt={album.title}
                className="w-full h-40 object-cover rounded"
              />
              <h3 className="text-lg font-medium mt-2">{album.title}</h3>
              <p className="text-sm text-gray-400">{album.year}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Artist;
