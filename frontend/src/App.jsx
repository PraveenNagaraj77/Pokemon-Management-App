// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import CreatePokemonUser from './pages/CreatePokemonUser';
import ListPokemonUsers from './pages/ListOfPokemonUsers';
import AddPokemon from './pages/AddPokemon';
import Footer from './components/Footer/Footer'

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-pokemon-user" element={<CreatePokemonUser />} />
          <Route path="/list-pokemon-users" element={<ListPokemonUsers />} />
          <Route path="/add-pokemon" element={<AddPokemon />} />
        </Routes>
      </div>
      <Footer/>
    </Router>
  );
};

export default App;
