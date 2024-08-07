import React, { useState, useEffect } from 'react';
import { getUsers, getPokemons } from '../services/api';
import '../styles/Home.css';
import ballImage from '../images/ball.png';

const Home = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [pokemons, setPokemons] = useState([]);
  const [pokemonPositions, setPokemonPositions] = useState({});
  const [isMoving, setIsMoving] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getUsers();
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    if (selectedUser) {
      const fetchPokemons = async () => {
        try {
          const response = await getPokemons(selectedUser);
          setPokemons(response.data);

          const initialPositions = {};
          response.data.forEach(pokemon => {
            initialPositions[pokemon.id] = {
              left: Math.random() * 200,
              top: Math.random() * 200,
              velocityX: Math.random() * 5,
              velocityY: Math.random() * 5,
              visible: true,
            };
          });
          setPokemonPositions(initialPositions);
        } catch (error) {
          console.error('Error fetching pokemons:', error);
        }
      };

      fetchPokemons();
    } else {
      setPokemons([]);
      setPokemonPositions({});
    }
  }, [selectedUser]);

  const handleUserChange = (e) => {
    setSelectedUser(e.target.value);
  };

  const handlePokemonGo = () => {
    setIsMoving(true);
  };

  const handlePokemonFlee = () => {
    alert('Danger!');
    const newPositions = { ...pokemonPositions };
    Object.keys(newPositions).forEach(id => {
      newPositions[id].visible = !newPositions[id].visible;
    });
    setPokemonPositions(newPositions);
  };

  const handlePokemonCease = () => {
    setIsMoving(false);
  };

  useEffect(() => {
    if (isMoving) {
      const interval = setInterval(() => {
        const newPositions = { ...pokemonPositions };
        Object.keys(newPositions).forEach(id => {
          if (newPositions[id].visible) {
            newPositions[id].left += newPositions[id].velocityX;
            newPositions[id].top += newPositions[id].velocityY;

            // Check for boundaries 
            if (
              newPositions[id].left < 0 ||
              newPositions[id].left > 300 || 
              newPositions[id].top < 0 ||
              newPositions[id].top > 300 
            ) {
              newPositions[id].visible = false;
            }
          }
        });
        setPokemonPositions(newPositions);
      }, 100);
      return () => clearInterval(interval);
    }
  }, [isMoving, pokemonPositions]);

  return (
    <div>
      <h1>Home Page</h1>
      <div>
        <label>Select User</label>
        <select onChange={handleUserChange} value={selectedUser}>
          <option value="">Select a user</option>
          {users.map(user => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
      </div>

      {selectedUser && (
        <>
          <table>
            <thead>
              <tr>
                <th>Pokemon Name</th>
                <th>Pokemon Ability</th>
                <th>No. of Pokemon</th>
              </tr>
            </thead>
            <tbody>
              {pokemons.map((pokemon, index) => (
                <tr key={pokemon.id}>
                  <td>{pokemon.pokemonName}</td>
                  <td>
                    {Array.isArray(pokemon.pokemonAbility)
                      ? pokemon.pokemonAbility.join(', ')
                      : pokemon.pokemonAbility}
                  </td>
                  {index === 0 && (
                    <td rowSpan={pokemons.length}>{pokemons.length}</td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>

          <div className="pokemon-buttons">
            <button onClick={handlePokemonGo}>Pokemon Go</button>
            <button onClick={handlePokemonFlee}>Pokemon Flee</button>
            <button onClick={handlePokemonCease}>Pokemon Cease</button>
          </div>

          <div id="pokemon-container" className="pokemon-container">
            {pokemons.map(pokemon => (
              <img
                key={pokemon.id}
                src={ballImage}
                alt={pokemon.pokemonName}
                style={{
                  left: `${pokemonPositions[pokemon.id]?.left}px`,
                  top: `${pokemonPositions[pokemon.id]?.top}px`,
                  position: 'absolute',
                  display: pokemonPositions[pokemon.id]?.visible ? 'block' : 'none'
                }}
                className="pokemon"
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
