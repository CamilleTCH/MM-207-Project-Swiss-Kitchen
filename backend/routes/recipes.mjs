import express from 'express';
import pool from '../db_interaction.mjs';
import { http_code, pg_errors } from '../global_stuff.mjs';

import { validate_difficulty_level, validate_dish_type, validate_step_info } from '../entry_validations.mjs';

const router = express.Router();

function return_error_message(res, code, message) {
    return res.status(code).json({ error: message });
}

router.post('/', async (req, res) => {
    if (!req.body) {
        return res.status(http_code.bad_request).json({ error: "Need appropriate body" });  // TODO Explain more ? 1 is this really needed ?
    }

    const { name, creator_user_id, description, dish_type, difficulty_level } = req.body;
    let steps = req.body.steps;

    if (!name || (creator_user_id !== undefined && creator_user_id < 0) || !dish_type || !difficulty_level) {
        return res.status(http_code.bad_request).json({ error: "Fields name, creator_user_id, dish_type and difficulty level are mandatory" });
    }

    if (!validate_difficulty_level(difficulty_level)) { return return_error_message(res, http_code.bad_request, 'difficulty level can only be "easy", "medium", "hard"') }
    if (!validate_dish_type(dish_type)) { return return_error_message(res, http_code.bad_request, 'dish type can only be "starter", "main_dish", or "dessert"') }

    if (steps !== undefined) {
        if (!Array.isArray(steps)) { return return_error_message(res, http_code.bad_request, "if existing, argument steps must be an array containing json of steps"); }
    } else {
        steps = []  // to avoid having to verify the condition multiple times later
    }

    for (const step of steps) {
        let valid_step_info = validate_step_info(step, true);   // ignore the recipe_id verification, since the id doesn't exist yet

        if (!valid_step_info.valid) return return_error_message(res, http_code.bad_request, `This step ${step} is not valid. ${valid_step_info.message}`);
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
                `INSERT INTO Step (related_recipe_id, step_number, name, description, estimated_time_in_seconds)
                VALUES ($1, $2, $3, $4, $5)
                RETURNING *`,
                [created_recipe.id, step_number, name, description, estimated_time_in_seconds]
            );
            insertedSteps.push(stepResult.rows[0]);

        }
        await client.query('COMMIT');

        res.status(http_code.created).json({ recipe: { ...created_recipe, steps: insertedSteps } });
    } catch (err) {
        await client.query('ROLLBACK');

        console.error("Error during recipe creation", err);

        if (err.code === pg_errors.unique_constraint_violation && err.table === "step") {
            return return_error_message(res, http_code.bad_request, "You tried to created multiple steps with the same step number for the same recipe");
        }

        res.status(http_code.internal_server_error).json({ error: err.message || 'Internal server error' });
    } finally {
        client.release();
    }
});

router.get('/', async (req, res) => {
    try {
        const result = await pool.query(
            `SELECT r.name, u.username AS creator_username, r.description, r.dish_type, r.difficulty_level
            FROM Recipe AS r
            JOIN SK_User AS u ON r.creator_user_id = u.id
            ;`
        );

        res.status(http_code.ok).json({ recipes: result.rows, message: "Here are the recipes" });
    } catch (err) {
        res.status(http_code.internal_server_error).json({ error: err.message || 'Internal server error' });
        return;
    }
});


router.get("/:id", async (req, res) => {
    const recipe_id = Number(req.params.id);

    if (!Number.isInteger(recipe_id)) return return_error_message(res, http_code.bad_request, `parameter id must be an integer, "${req.params.id}" is not`);

    try {
        const result = await pool.query(
            `SELECT r.name, u.username AS creator_username, r.description, r.dish_type, r.difficulty_level
            FROM Recipe AS r
            JOIN SK_User AS u ON r.creator_user_id = u.id
            WHERE r.id = $1
            ;`,
            [recipe_id]
        );

        if (result.rowCount === 0) { return return_error_message(res, http_code.not_found, `No recipe with id "${recipe_id}"`); }

        const stepsResult = await pool.query(
            `SELECT * FROM Step
            WHERE related_recipe_id = $1
            ORDER BY step_number ASC`,
            [recipe_id]
        );

        res.status(http_code.ok).json({ recipe: { ...result.rows[0], steps: stepsResult.rows }, message: "Here is the recipe" });
    } catch (err) {

        res.status(http_code.internal_server_error).json({ error: err.message || 'Internal server error' });
    }
});



router.put('/:id', async (req, res) => {
    const recipe_id = Number(req.params.id);

    if (!Number.isInteger(recipe_id)) return return_error_message(res, http_code.bad_request, `parameter id must be an integer, "${req.params.id}" is not`);

    const { name, description, dish_type, difficulty_level } = req.body;
    let steps = req.body.steps;

    const text_fields = [];

    if (name) { text_fields.push(`name = '${name}'`) }
    if (description) { text_fields.push(`description = '${description}'`) }
    if (dish_type) {
        if (!validate_dish_type(dish_type)) { return return_error_message(res, http_code.bad_request, 'dish type can only be "starter", "main_dish", or "dessert"') }

        text_fields.push(`dish_type = '${dish_type}'`)
    }
    if (difficulty_level) {
        if (!validate_difficulty_level(difficulty_level)) { return return_error_message(res, http_code.bad_request, 'difficulty level can only be "easy", "medium", "hard"') }
        text_fields.push(`difficulty_level = '${difficulty_level}'`)
    }

    if (steps !== undefined) {
        if (!Array.isArray(steps)) { return return_error_message(res, http_code.bad_request, "if existing, argument steps must be an array containing json of steps"); }
    } else {
        steps = []  // to avoid having to verify the condition multiple times later
    }

    if (text_fields.length === 0 && steps.length === 0) {
        return res.status(http_code.bad_request).json({ error: 'No fields to update' });
    }

    for (const step of steps) {
        let valid_step_info = validate_step_info(step, true);   // ignore the recipe_id verification, since the id doesn't exist yet
        
        if (!valid_step_info.valid) return return_error_message(res, http_code.bad_request, `This step ${step} is not valid. ${valid_step_info.message}`);
    }
    

    const client = await pool.connect();
    try {
        client.query("BEGIN;");

        const recipeResult = await client.query(
            `UPDATE Recipe SET ${text_fields.join(', ')} WHERE id = ${recipe_id}
            RETURNING *;`
        );
        if (recipeResult.rowCount === 0) {
            await client.query("ROLLBACK");
            return return_error_message(res, http_code.not_found, `No recipe found with id ${recipe_id}`);
        }
        const recipe = recipeResult.rows[0];


        // // Insert the steps
        for (const step of steps) {
            const { name, step_number, description, estimated_time_in_seconds } = step;
            const stepResult = await client.query(
                `INSERT INTO Step (related_recipe_id, step_number, name, description, estimated_time_in_seconds)
                VALUES ($1, $2, $3, $4, $5)
                RETURNING *`,
                [recipe_id, step_number, name, description, estimated_time_in_seconds]
            );
        }

        await client.query('COMMIT'); await client.query('BEGIN');
        const allSteps = await client.query(`
                SELECT * FROM Step WHERE related_recipe_id = ${recipe_id};
            `);

        await client.query("COMMIT;");
        res.status(http_code.ok).json({ recipe: { ...recipe, steps: allSteps.rows }});
        
    } catch (err) {
        await client.query('ROLLBACK');
        if (err.code === pg_errors.unique_constraint_violation && err.table === "step") {
            return return_error_message(res, http_code.bad_request, "You tried to created multiple steps with the same step number for the same recipe");
        }
        console.error(err);
        res.status(http_code.bad_request).json({ error: 'Internal server error' });

    } finally {
        client.release();
    }


});


export default router;
