// require('dotenv').config() // or import 'dotenv/config' if you're using ES6

import 'dotenv/config';

import express from 'express';

import userRoutes from './routes/users.mjs';
import recipeRoutes from './routes/recipes.mjs';

const PORT = process.env.PORT || 3000;
const DB_URL = process.env.DATABASE_URL;

const app = express();


app.use(express.json());


app.use('/api/users', userRoutes);
app.use('/api/recipes', recipeRoutes);

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'Recipe sharing API is running!' });
});



app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});