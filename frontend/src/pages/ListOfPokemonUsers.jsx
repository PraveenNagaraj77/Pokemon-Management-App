import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { getUsers, getPokemons, deletePokemon } from '../services/api'; 
import '../styles/ListofPokemonUsers.css'; 
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

const ListOfPokemonUsers = () => {
  const [users, setUsers] = useState([]);
  const [pokemons, setPokemons] = useState([]);
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchUsersAndPokemons = async () => {
      try {
        const usersResponse = await getUsers();
        setUsers(usersResponse.data);
        
        const pokemonsResponse = await getPokemons();
        setPokemons(pokemonsResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchUsersAndPokemons();
  }, []);

  const handleDeletePokemon = async (pokemonId) => {
    try {
      await deletePokemon(pokemonId);
      setPokemons(pokemons.filter(pokemon => pokemon.id !== pokemonId));
      toast.success('Pokemon deleted successfully!');
    } catch (error) {
      console.error('Error deleting Pokemon:', error);
      toast.error('Error deleting Pokemon. Please try again later.');
    }
  };
  
  const handleDeleteAll = async () => {
    try {
      for (const pokemon of pokemons) {
        await deletePokemon(pokemon.id);
      }
      setPokemons([]);
      toast.success('All Pokemon deleted successfully!');
    } catch (error) {
      console.error('Error deleting all Pokemon:', error);
      toast.error('Error deleting all Pokemon. Please try again later.');
    }
  };
  

  const handleAddPokemon = (ownerName) => {
  
    navigate('/add-pokemon', { state: { ownerName } });
  };

  return (
    <div className='background'>
      <h1>List of Pokemon Users</h1>
      {pokemons.length > 0 && (
         <div className='deletebutton'>
         <button className='deleteall' onClick={handleDeleteAll}>Delete All</button>
         </div>
      )}
     
     
      <table>
        <thead>
          <tr>
            <th>Pokemon Owner Name</th>
            <th>No. of Pokemon</th>
            <th>Add Pokemon</th>
            <th>Pokemon Name</th>
            <th>Pokemon Ability</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => {
            const userPokemons = pokemons.filter(pokemon => pokemon.userId === user.id);
            const numberOfPokemons = userPokemons.length;
            return userPokemons.map((pokemon, index) => (
              <tr key={pokemon.id}>
                {index === 0 && (
                  <>
                    <td rowSpan={numberOfPokemons}>
                      {user.name}
                    </td>
                    <td rowSpan={numberOfPokemons}>
                      {numberOfPokemons}
                    </td>
                    <td rowSpan={numberOfPokemons}>
                      <button onClick={() => handleAddPokemon(user.name)}>Add Pokemon</button>
                    </td>
                  </>
                )}
                <td>{pokemon.pokemonName}</td>
                <td>{pokemon.pokemonAbility}</td>
                <td>
                  <button>Edit</button>
                </td>
                <td>
                  <button onClick={() => handleDeletePokemon(pokemon.id)}>Delete</button>
                </td>
              </tr>
            ));
          })}
        </tbody>
      </table>
      <ToastContainer />
    </div>
  );
};

export default ListOfPokemonUsers;
