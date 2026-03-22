import 'dotenv/config';

import express from 'express';

const app = express();

import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static(join(__dirname, '../frontend')))

import userRoutes from './routes/users.mjs';
import recipeRoutes from './routes/recipes.mjs';
import stepRoutes from './routes/steps.mjs'

const PORT = process.env.PORT || 3000;
const DB_URL = process.env.DATABASE_URL;

app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/recipes', recipeRoutes);
app.use('/api/recipes/:id/steps', stepRoutes);


app.get('/health_check', (req, res) => {
  res.json({ message: 'API is running!' });
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});