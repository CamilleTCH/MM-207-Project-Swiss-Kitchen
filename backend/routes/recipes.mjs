import express from 'express';
import pool from '../db_interaction.mjs';
import { http_code } from '../global_stuff.mjs';

import { validate_difficulty_level, validate_dish_type, validate_step_info } from '../entry_validations.mjs';

const router = express.Router();

function return_error_message(res, code, message) {
    return res.status(code).json({ error: message });
}

router.post('/', async (req, res) => {
    if (!req.body) {
        return res.status(http_code.bad_request).json({ error: "Need appropriate body" });
    }

    const { name, creator_user_id, description, dish_type, difficulty_level, steps } = req.body;
    // console.log(name, creator_user_id, description, dish_type, difficulty_level, steps);
    
    if (!name || (creator_user_id !== undefined && creator_user_id < 0) || !dish_type || !difficulty_level) {
        return res.status(http_code.bad_request).json({ error: "Fields name, creator_user_id, dish_type and difficulty level are mandatory" });
    }

    if (!validate_difficulty_level(difficulty_level)) { return return_error_message(res, http_code.bad_request, 'difficulty level can only be "easy", "medium", "hard"') }
    if (!validate_dish_type(dish_type)) { return return_error_message(res, http_code.bad_request, 'dish type can only be "starter", "main_dish", or "dessert"') }

    if (steps !== undefined && !Array.isArray(steps)) {
        return return_error_message(res, http_code.bad_request, "if existing, argument steps must be an array containing json of steps");
    }

    if (steps !== undefined) {
        for (const step of steps) {
            let valid_step_info = validate_step_info(step, true);   // ignore the recipe_id verification, since the id doesn't exist yet
            
            if (!valid_step_info.valid) return return_error_message(res, http_code.bad_request, `This step ${step} is not valid. ${valid_step_info.message}`);
        }
    }

    const client = await pool.connect();
    try {
        // Insert the recipe
        await client.query("BEGIN");

        const recipeResult = await client.query(
            `INSERT INTO Recipe (name, creator_user_id, description, dish_type, difficulty_level)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *`,
            [name, creator_user_id, description, dish_type, difficulty_level]
        );
        const created_recipe = recipeResult.rows[0];

        const insertedSteps = [];

        // // Insert the steps
        for (let i = 0; i < steps.length; i++) {
            const { name, step_number, description, estimated_time_in_seconds } = steps[i];
            const stepResult = await client.query(
                `INSERT INTO Step (related_recipe_id, step_number_id, name, description, estimated_time_in_seconds)
                VALUES ($1, $2, $3, $4, $5)
                RETURNING *`,
                [created_recipe.id, step_number, name, description, estimated_time_in_seconds]
            );
            insertedSteps.push(stepResult.rows[0]);

        }
        await client.query('COMMIT');

        res.status(201).json({ recipe: { ...created_recipe, steps: insertedSteps } });
    } catch (err) {
        await client.query('ROLLBACK');
        
        console.error("Error during recipe creation" , err);

        res.status(500).json({ error: err.message || 'Internal server error' });
    } finally {
        client.release();
    }

});



export default router;
