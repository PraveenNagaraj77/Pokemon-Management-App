const fs = require('fs');
const path = require('path');

const pokemonsFilePath = path.join(__dirname, '../data/pokemons.json');
const usersFilePath = path.join(__dirname, '../data/users.json');


const readPokemonData = () => {
  if (!fs.existsSync(pokemonsFilePath)) {
    return [];
  }
  const rawData = fs.readFileSync(pokemonsFilePath);
  return JSON.parse(rawData);
};


const writePokemonData = (data) => {
  fs.writeFileSync(pokemonsFilePath, JSON.stringify(data, null, 2));
};


const readUserData = () => {
  if (!fs.existsSync(usersFilePath)) {
    return [];
  }
  const rawData = fs.readFileSync(usersFilePath);
  return JSON.parse(rawData);
};


const writeUserData = (data) => {
  fs.writeFileSync(usersFilePath, JSON.stringify(data, null, 2));
};


exports.getAllPokemons = (req, res) => {
  const userId = parseInt(req.query.userId, 10);
  const pokemons = readPokemonData();

  if (userId) {
    const filteredPokemons = pokemons.filter(pokemon => pokemon.userId === userId);
    res.json(filteredPokemons);
  } else {
    res.json(pokemons);
  }
};


exports.getPokemonById = (req, res) => {
  const { id } = req.params;
  const pokemons = readPokemonData();
  const pokemon = pokemons.find(p => p.id === parseInt(id, 10));
  if (pokemon) {
    res.json(pokemon);
  } else {
    res.status(404).send('Pokemon not found');
  }
};


exports.createPokemon = (req, res) => {
  try {
    const { ownerName, pokemonName, pokemonAbility, initialPositionX, initialPositionY, speed, direction } = req.body;
    
    if (!ownerName || !pokemonName) {
      return res.status(400).send('Owner name and Pokemon name are required.');
    }
    

    const pokemons = readPokemonData();
    let users = readUserData();

 
    const normalizedOwnerName = ownerName.trim().toLowerCase();

 
    let user = users.find(user => user.name.toLowerCase() === normalizedOwnerName);

    if (!user) {

      const newUserId = users.length ? Math.max(...users.map(u => u.id)) + 1 : 1;
      user = { id: newUserId, name: ownerName };
      users.push(user);


      users.sort((a, b) => a.name.localeCompare(b.name));
      writeUserData(users);
    }


    const newPokemon = {
      id: pokemons.length ? pokemons[pokemons.length - 1].id + 1 : 1, 
      userId: user.id, 
      ownerName: user.name, 
      pokemonName,
      pokemonAbility,
      initialPositionX,
      initialPositionY,
      speed,
      direction
    };
    
    pokemons.push(newPokemon);
    writePokemonData(pokemons);

    res.status(201).json(newPokemon);
  } catch (error) {
    console.error('Error adding Pokemon:', error);
    res.status(500).send('An error occurred while adding the Pokemon.');
  }
};


exports.updatePokemon = (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;
  const pokemons = readPokemonData();
  const index = pokemons.findIndex(p => p.id === parseInt(id, 10));

  if (index !== -1) {
    pokemons[index] = { ...pokemons[index], ...updatedData };
    writePokemonData(pokemons);
    res.json(pokemons[index]);
  } else {
    res.status(404).send('Pokemon not found');
  }
};


exports.deletePokemon = (req, res) => {
  const { id } = req.params;
  const pokemons = readPokemonData();
  const users = readUserData();

  
  const pokemonToDelete = pokemons.find(p => p.id === parseInt(id, 10));
  if (!pokemonToDelete) {
    return res.status(404).send('Pokemon not found');
  }

  
  const filteredPokemons = pokemons.filter(p => p.id !== parseInt(id, 10));
  writePokemonData(filteredPokemons);

  
  const ownerId = pokemonToDelete.userId;
  const userHasOtherPokemons = filteredPokemons.some(p => p.userId === ownerId);

  if (!userHasOtherPokemons) {
    const filteredUsers = users.filter(u => u.id !== ownerId);
    writeUserData(filteredUsers);
  }

  res.status(204).send();
};
