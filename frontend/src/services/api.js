import axios from 'axios';

const API_URL = 'http://localhost:5000';

// User API
export const getUsers = () => axios.get(`${API_URL}/users`);
export const getUserById = (id) => axios.get(`${API_URL}/users/${id}`);
export const addUser = (user) => axios.post(`${API_URL}/users`, user);
export const updateUser = (id, user) => axios.put(`${API_URL}/users/${id}`, user);
export const deleteUser = (id) => axios.delete(`${API_URL}/users/${id}`);

// Pokemon API
export const getPokemons = (userId) => {
  const params = userId ? { userId } : {};
  return axios.get(`${API_URL}/pokemons`, { params });
};

export const getPokemonById = (id) => axios.get(`${API_URL}/pokemons/${id}`);
export const addPokemon = (pokemon) => axios.post(`${API_URL}/pokemons`, pokemon);
export const updatePokemon = (id, pokemon) => axios.put(`${API_URL}/pokemons/${id}`, pokemon);
export const deletePokemon = (id) => axios.delete(`${API_URL}/pokemons/${id}`);
