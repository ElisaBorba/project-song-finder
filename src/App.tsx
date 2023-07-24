import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/login';
import Search from './pages/search';
import Album from './pages/album';
import NotFound from './pages/not-found';
import Favorites from './pages/favorites';
import Profile from './pages/profile';
import Layout from './components/Layout';

function App() {
  return (
    <Routes>
      <Route path="/" element={ <Layout /> }>
        <Route path="/search" element={ <Search /> } />
        <Route path="/album/:id" element={ <Album /> } />
        <Route path="/favorites" element={ <Favorites /> } />
        <Route path="/profile" element={ <Profile /> } />
        <Route path="/*" element={ <NotFound /> } />
      </Route>
      <Route index element={ <Login /> } />
    </Routes>
  );
}

export default App;
