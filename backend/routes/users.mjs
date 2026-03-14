import pool from '../db_interaction.mjs';

import express from 'express';
import bcrypt from 'bcrypt';


const router = express.Router();

router.get("/:id", async (req, res) => {
    res.json({ message: 'Requête get users' });
});



router.post("/register", async (req, res) => {

    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ error: 'username, email, and password are required'});
    }

    try {
        const hashedPassword = bcrypt.hash(password, 10);

        const result = await pool.query(
        `INSERT INTO users (username, email, password)
        VALUES ($1, $2, $3)
        RETURNING id, username, email, created_at`,
        [username, email, hashedPassword]
        );

        res.status(201).json({ user: result.rows[0] });
    } catch(err) {
        // 23505 is violation of unique constraints, remove magic number ?
        if (err.code === '23505'){
            return res.status(409).json({ error: 'Username or email already taken'});
        }
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});




export default router;