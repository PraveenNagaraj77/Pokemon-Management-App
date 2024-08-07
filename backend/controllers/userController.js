const fs = require('fs');
const path = require('path');

const usersFilePath = path.join(__dirname, '../data/users.json');

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


exports.getAllUsers = (req, res) => {
  const users = readUserData();
  res.json(users);
};


exports.getUserById = (req, res) => {
  const { id } = req.params;
  const users = readUserData();
  const user = users.find(u => u.id === parseInt(id, 10));
  if (user) {
    res.json(user);
  } else {
    res.status(404).send('User not found');
  }
};

exports.createUser = (req, res) => {
  try {
    const { name } = req.body;
    
    if (!name) {
      return res.status(400).send('Name is required.');
    }
    
    let users = readUserData();
    const newUserId = users.length ? Math.max(...users.map(u => u.id)) + 1 : 1;
    const newUser = { id: newUserId, name };
    users.push(newUser);
    writeUserData(users);
    
    res.status(201).json(newUser);  
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).send('An error occurred while creating the user.');
  }
};


exports.updateUser = (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;
  const users = readUserData();
  const index = users.findIndex(u => u.id === parseInt(id, 10));

  if (index !== -1) {
    users[index] = { ...users[index], ...updatedData };
    writeUserData(users);
    res.json(users[index]);
  } else {
    res.status(404).send('User not found');
  }
};


exports.deleteUser = (req, res) => {
  const { id } = req.params;
  const users = readUserData();
  const filteredUsers = users.filter(u => u.id !== parseInt(id, 10));
  writeUserData(filteredUsers);
  res.status(204).send();
};
