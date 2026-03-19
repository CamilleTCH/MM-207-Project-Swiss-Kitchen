import pool from '../db_interaction.mjs';

import express from 'express';

import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

import { http_code, pg_errors, userPasswordHashRounds } from '../global_stuff.mjs'


const router = express.Router();

router.get("/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query(
            'SELECT id, username, email, created_at FROM SK_User WHERE id = $1', [id]
        );

        if (result.rows.length === 0) {
            res.status(http_code.not_found).json({ error: "User not found" });
        }

        // do something particular if length > 0 ? 

        res.json({ user: result.rows[0] });

    } catch (err) {
        console.error(err);
        res.status(http_code.internal_server_error).json({ error: 'Internal server error' });
    }
});



router.post("/register", async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(http_code.bad_request).json({ error: 'username, email, and password are required' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, userPasswordHashRounds);

        const result = await pool.query(
            `INSERT INTO SK_User (username, email, password)
        VALUES ($1, $2, $3)
        RETURNING id, username, email, created_at`,
            [username, email, hashedPassword]
        );

        res.status(http_code.created).json({ user: result.rows[0] });
    } catch (err) {

        if (err.code === pg_errors.uniqueConstraintViolation) {
            return res.status(http_code.conflict).json({ error: 'Username or email already taken' });
        }
        console.error(err);
        res.status(http_code.internal_server_error).json({ error: 'Internal server error' });
    }
});


router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { username, email, password } = req.body;

    try {
        const text_fields = [];

        if (username) { text_fields.push(`username = '${username}'`) }
        if (email) { text_fields.push(`email = '${email}'`) }
        if (password) {
            const hashed = await bcrypt.hash(password, userPasswordHashRounds);
            text_fields.push(`password = '${hashed}'`)
        }

        if (text_fields.length === 0) {
            return res.status(http_code.bad_request).json({ error: 'No fields to update' });
        }

        // TODO this sql statement won't create any error if the id doesn't exist. Is that a problem ? 
        const result = await pool.query(
            `UPDATE SK_User SET ${text_fields.join(', ')} WHERE id = ${id}
            RETURNING id, username, email, created_at`
        );

        res.status(http_code.created).json({ user: result.rows[0] });

    } catch (err) {
        console.error(err);
        res.status(http_code.internal_server_error).json({ error: 'Internal server error' });
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
            return res.status(http_code.not_found).json({ error: 'User not found' });
        }

        res.json({ message: `Account with id ${id} was deleted` });

    } catch (err) {
        console.error(err);
        res.status(http_code.internal_server_error).json({ error: 'Internal server error' });
    }
});


router.post("/login", async (req, res) => {
    if (!req.body) {
        return res.status(http_code.bad_request).json({ error: "Need a body with email and password" });  // TODO Explain more ?
    }
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(http_code.bad_request).json({ error: "email and password are required in the body" });
    }

    try {
        const result = await pool.query(
            "SELECT * FROM SK_User WHERE email = $1",
            [email]
        );

        const user = result.rows[0];

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(http_code.unauthorized).json({ error: "Invalid email or password" });
        }

        const token = jwt.sign(
            { id: user.id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: "24h" }
        );

        res.json({
            token: token,
            user: { id: user.id, username: user.username, email: user.email }
        });

    } catch (err) {
        console.error(err);
        res.status(http_code.bad_request).json({ error: "Internal server error" });
    }
});



export default router;