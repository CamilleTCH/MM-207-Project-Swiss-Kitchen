import pool from '../db_interaction.mjs';

import express from 'express';
import bcrypt from 'bcrypt';

import { errors } from '../global_stuff.mjs'


const router = express.Router();

router.get("/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query(
            'SELECT id, username, email, created_at FROM SK_User WHERE id = $1', [id]
        );

        if (result.rows.length === 0) {
            res.status(404).json({ error: "User not found" });
        }

        // do something particular if length > 0 ? 

        res.json({ user: result.rows[0] });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});



router.post("/register", async (req, res) => {

    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ error: 'username, email, and password are required' });
    }

    try {
        const hashedPassword = bcrypt.hash(password, 10);

        const result = await pool.query(
            `INSERT INTO SK_User (username, email, password)
        VALUES ($1, $2, $3)
        RETURNING id, username, email, created_at`,
            [username, email, hashedPassword]
        );

        res.status(201).json({ user: result.rows[0] });
    } catch (err) {

        if (err.code === errors.unique_constraint_violation) {
            return res.status(409).json({ error: 'Username or email already taken' });
        }
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});


router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { username, email, password } = req.body;



    try {
        const text_fields = [];


        if (username) { text_fields.push(`username = '${username}'`) }
        if (email) { text_fields.push(`email = '${email}'`)}
        if (password) {
            const hashed = await bcrypt.hash(password, 10);
            text_fields.push(`password = '${hashed}'`)
        }

        if (text_fields.length === 0){
            return res.status(400).json({ error: 'No fields to update'});
        } 

        // TODO this sql statement won't create any error if the id doesn't exist. Is that a problem ? 
        const result = await pool.query(
            `UPDATE SK_User SET ${text_fields.join(', ')} WHERE id = ${id}
            RETURNING id, username, email, created_at`
        );

        res.json({ user: result.rows[0] });

    } catch (err) {

        console.error(err);
        res.status(500).json({ error: 'Internal server error' });

    }
});



router.delete("/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query(
            'DELETE FROM SK_User WHERE id = $1 RETURNING id',
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json({ message: `Account with ${id} was deleted` });

    } catch (err) {

        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});





export default router;