// require('dotenv').config() // or import 'dotenv/config' if you're using ES6

import 'dotenv/config';

import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json())



// Health check
app.get('/', (req, res) => {
  res.json({ message: 'Recipe sharing API is running!' });
});



app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});