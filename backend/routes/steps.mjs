import express from 'express';
import { http_code, pg_errors } from '../global_stuff.mjs';

import { validate_step_info } from '../entry_validations.mjs';
import { return_error_message } from '../utils.mjs';
import pool from '../db_interaction.mjs'

const router = express.Router({ mergeParams: true });



router.post('/', async (req, res) => {
    if (!req.body) {
        return res.status(http_code.bad_request).json({ error: "Need appropriate body" });  // TODO Explain more ?
    }

    const recipe_id = Number(req.params.id);
    if (!Number.isInteger(recipe_id)) return return_error_message(res, http_code.bad_request, `parameter id must be an integer, "${req.params.id}" is not`);

    const { step_number, name, description, estimated_time_in_seconds } = req.body;
    let valid_step_info = validate_step_info(step_number, name, estimated_time_in_seconds);
    if (!valid_step_info.valid) { return return_error_message(res, http_code.bad_request, `Unvalid step : ${valid_step_info.message}`); }

    try {
        const result = await pool.query(`
            INSERT INTO Step (related_recipe_id, step_number, name, description, estimated_time_in_seconds)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *
            ;`,
            [recipe_id, step_number, name, description, estimated_time_in_seconds]);
        console.log(`Et on a : ${result}`);
    } catch (err) {
        if (err.code === pg_errors.uniqueConstraintViolation && err.table === "step") {
            return return_error_message(res, http_code.bad_request, "You tried to created multiple steps with the same step number for the same recipe");
        } else if (err.code === pg_errors.unexistantForeignKey) {
            res.status(http_code.not_found).json({error : `No recipe with id ${recipe_id}`})
        } else {
            console.error(err);
            res.status(http_code.internal_server_error).json({ error: 'Internal server error' })
        }
    }

    res.status(http_code.created).json({ message: "Created the step." });
});


export default router;