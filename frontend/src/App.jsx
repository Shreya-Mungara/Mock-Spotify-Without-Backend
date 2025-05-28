import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Sidebar from './components/Sidebar';
import Player from './components/player';
import Home from './pages/Home';
import Search from './pages/Search';
import Library from './pages/Library';
import Playlist from './pages/Playlist';
import Artist from './pages/Artist';
import Album from './pages/Album';
import Profile from './pages/Profile';
import Favorites from './pages/Favorites';
import Settings from './pages/Settings';

import SignUp from './pages/SignUp';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Only show login page as the default route */}
        <Route path="/" element={<Login />} />

        {/* Once logged in, this route will display the Home page */}
        <Route path="/home" element={
          <div className="flex h-screen bg-black">
            <Sidebar />
            <div className="flex-1 flex flex-col">
              <main className="flex-1 overflow-y-auto bg-gradient-to-b from-gray-900 to-black">
                <Home />
              </main>
              <Player />
            </div>
          </div>
        } />
        
        {/* Define other routes as needed */}
        <Route path="/search" element={<Search />} />
        <Route path="/library" element={<Library />} />
        <Route path="/playlist/:id" element={<Playlist />} />
        <Route path="/artist/:id" element={<Artist />} />
        <Route path="/album/:id" element={<Album />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  );
};

export default App;
