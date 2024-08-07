const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const userRoutes = require('./routes/userRoutes');
const pokemonRoutes = require('./routes/pokemonRoutes');

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.use('/users', userRoutes);
app.use('/pokemons', pokemonRoutes);



app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
