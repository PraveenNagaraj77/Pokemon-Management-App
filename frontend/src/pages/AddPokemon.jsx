import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; 
import { addPokemon, getUsers, addUser } from '../services/api'; 
import '../styles/AddPokemon.css'; 
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

const AddPokemonPage = () => {
  const location = useLocation(); 
  const navigate = useNavigate(); 
  const [users, setUsers] = useState([]);
  const [pokemonNames, setPokemonNames] = useState([]);
  const [pokemonName, setPokemonName] = useState('');
  const [pokemonAbility, setPokemonAbility] = useState('');
  const [initialPositionX, setInitialPositionX] = useState('');
  const [initialPositionY, setInitialPositionY] = useState('');
  const [speed, setSpeed] = useState('');
  const [direction, setDirection] = useState('');
  const [error, setError] = useState('');
  const ownerName = location.state?.ownerName || ''; 

  useEffect(() => {
    const fetchPokemonNames = async () => {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1000');
        const data = await response.json();
        setPokemonNames(data.results.map(pokemon => pokemon.name));
      } catch (error) {
        console.error('Error fetching Pokemon names:', error);
        setError('Error fetching Pokemon names. Please try again later.');
      }
    };

    fetchPokemonNames();
  }, []);

  useEffect(() => {
    if (pokemonName) {
      fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
        .then(response => response.json())
        .then(data => {
          const abilities = data.abilities.map(a => a.ability.name);
          setPokemonAbility(abilities.join(', '));
        })
        .catch(error => {
          console.error('Error fetching Pokemon abilities:', error);
          setError('Error fetching Pokemon abilities. Please try again later.');
        });
    }
  }, [pokemonName]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getUsers();
        if (Array.isArray(response.data)) {
          setUsers(response.data);
        } else {
          throw new Error('Unexpected data structure');
        }
      } catch (error) {
        console.error('Error fetching users:', error);
        setError('Error fetching users. Please try again later.');
      }
    };

    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let existingUser = users.find(user => user.name.toLowerCase() === ownerName.trim().toLowerCase());
      let userId = existingUser ? existingUser.id : null;
  
      if (!existingUser) {
        const userResponse = await addUser({ name: ownerName });
        if (userResponse.data && userResponse.data.id) {
          userId = userResponse.data.id;
          setUsers(prevUsers => [...prevUsers, { id: userId, name: ownerName }]);
        } else {
          throw new Error('User addition failed: No ID returned');
        }
      }
  
      await addPokemon({
        userId,
        pokemonName,
        pokemonAbility,
        initialPositionX,
        initialPositionY,
        speed,
        direction,
        ownerName
      });
  
      toast.success('Pokemon added successfully!');
      setPokemonName('');
      setPokemonAbility('');
      setInitialPositionX('');
      setInitialPositionY('');
      setSpeed('');
      setDirection('');
      setError('');
      navigate('/list-pokemon-users'); 
    } catch (error) {
      console.error('Error adding Pokemon or user:', error);
      toast.error(error.message || 'Error adding Pokemon or user. Please try again later.');
    }
  };
  
  
  return (
    <div className="add-pokemon-container">
      <h1>Add Pokemon</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Owner Name:</label>
          <input
            type="text"
            value={ownerName}
            readOnly
          />
        </div>
        <div>
          <label>Pokemon Name:</label>
          <select onChange={(e) => setPokemonName(e.target.value)} value={pokemonName}>
            <option value="">Select Pokemon</option>
            {pokemonNames.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Pokemon Ability:</label>
          <input type="text" value={pokemonAbility} readOnly />
        </div>
        <div>
          <label>Initial Position X:</label>
          <input
            type="number"
            value={initialPositionX}
            onChange={(e) => setInitialPositionX(e.target.value)}
          />
        </div>
        <div>
          <label>Initial Position Y:</label>
          <input
            type="number"
            value={initialPositionY}
            onChange={(e) => setInitialPositionY(e.target.value)}
          />
        </div>
        <div>
          <label>Speed:</label>
          <input type="number" value={speed} onChange={(e) => setSpeed(e.target.value)} />
        </div>
        <div>
          <label>Direction:</label>
          <input type="text" value={direction} onChange={(e) => setDirection(e.target.value)} />
        </div>
        <button type="submit">Add Pokemon</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default AddPokemonPage;
