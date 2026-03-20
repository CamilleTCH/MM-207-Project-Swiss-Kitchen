import express from 'express';
import { http_code, pg_errors } from '../global_stuff.mjs';

import { validate_step_info } from '../entry_validations.mjs';
import { return_error_message } from '../utils.mjs';
import pool from '../db_interaction.mjs';

import hasAuthenticateToken from "../middleware/auth.mjs";

const router = express.Router({ mergeParams: true });



router.post('/', hasAuthenticateToken, async (req, res) => {
    if (!req.body) {
        return res.status(http_code.bad_request).json({ error: "Need appropriate body" });  // TODO Explain more ?
    }

    const recipeId = Number(req.params.id);
    if (!Number.isInteger(recipeId)) return return_error_message(res, http_code.bad_request, `parameter id must be an integer, "${req.params.id}" is not`);

    const { step_number, name, description, estimated_time_in_seconds } = req.body;
    let valid_step_info = validate_step_info(step_number, name, estimated_time_in_seconds);
    if (!valid_step_info.valid) { return return_error_message(res, http_code.bad_request, `Unvalid step : ${valid_step_info.message}`); }

    try {
        const result = await pool.query(`
            INSERT INTO Step (related_recipeId, step_number, name, description, estimated_time_in_seconds)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *
            ;`,
            [recipeId, step_number, name, description, estimated_time_in_seconds]);
        console.log(`Et on a : ${result}`);
        res.status(http_code.created).json({
            message: "Created the step.",
            step: result.rows[0]
        });
    } catch (err) {
        if (err.code === pg_errors.uniqueConstraintViolation && err.table === "step") {
            return return_error_message(res, http_code.bad_request, "You tried to created multiple steps with the same step number for the same recipe");
        } else if (err.code === pg_errors.unexistantForeignKey) {
            res.status(http_code.not_found).json({ error: `No recipe with id ${recipeId}` })
        } else {
            console.error(err);
            res.status(http_code.internal_server_error).json({ error: 'Internal server error' })
        }
    }
});


router.put('/:stepNumber', hasAuthenticateToken, async (req, res) => {
    if (!req.body) {
        return res.status(http_code.bad_request).json({ error: "Need appropriate body" });  // TODO Explain more ?
    }
    const recipeId = Number(req.params.id);
    if (!Number.isInteger(recipeId)) return return_error_message(res, http_code.bad_request, `parameter recipeId must be an integer, "${req.params.id}" is not`)
    let stepNumber = Number(req.params.stepNumber);
    if (!Number.isInteger(stepNumber)) return return_error_message(res, http_code.bad_request, `parameter stepNumber must be an integer, "${req.params.stepId}" is not`)
    
    const { name, description, estimated_time_in_seconds } = req.body;
    if (req.body.step_number) stepNumber = req.body.step_number; 

    let valid_step_info = validate_step_info(stepNumber, name, estimated_time_in_seconds);
    if (!valid_step_info.valid) { return return_error_message(res, http_code.bad_request, `Unvalid step : ${valid_step_info.message}`); }

    try {
        const text_fields = [];
        if (name) text_fields.push(`name = '${name.replace(/'/g, "''")}'`);

        if (req.body.step_number) text_fields.push(`step_number = '${stepNumber}'`);
        if (description) text_fields.push(`description = '${description.replace(/'/g, "''")}'`);
        if (estimated_time_in_seconds) text_fields.push(`estimated_time_in_seconds = '${estimated_time_in_seconds}'`);
        
        if (text_fields.length === 0){
            return res.status(http_code.bad_request).json({ error: 'No fields to update'});
        } 

        const result = await pool.query(
            `UPDATE Step SET ${text_fields.join(', ')} WHERE step_number = ${req.params.stepNumber} AND related_recipe_id = ${recipeId}
            RETURNING *;`
        );

        res.status(http_code.created).json({ message : "The step was updated", user: result.rows[0]});

    } catch (err) {
        console.error(err);
        res.status(http_code.internal_server_error).json({ error: 'Internal server error' });
    }
});

router.delete('/:stepNumber', hasAuthenticateToken, async (req, res) => {
    const recipeId = Number(req.params.id);
    if (!Number.isInteger(recipeId)) return return_error_message(res, http_code.bad_request, `parameter recipeId must be an integer, "${req.params.id}" is not`)
    let stepNumber = Number(req.params.stepNumber);
    if (!Number.isInteger(stepNumber)) return return_error_message(res, http_code.bad_request, `parameter stepNumber must be an integer, "${req.params.stepId}" is not`)

    try {
        const result = await pool.query(
            'DELETE FROM Step WHERE step_number = $1 and related_recipe_id = $2',
            [stepNumber ,recipeId]
        );

        if (result.rowCount === 0) {
            return res.status(http_code.not_found).json({ error: 'Step not found' });
        }

        res.status(http_code.ok).json({ message: `Step with number ${stepNumber} of recipe with id ${recipeId} was deleted` });

    } catch (err) {
        console.error(err);
        res.status(http_code.internal_server_error).json({ error: 'Internal server error' });
    }
});


export default router;