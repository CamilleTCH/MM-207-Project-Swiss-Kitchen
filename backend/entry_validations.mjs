// file that contains functions that validates entries (and that are specific to this app)


export function validate_difficulty_level(difficulty_level){
    return difficulty_level === "easy" || difficulty_level === "medium" || difficulty_level === "hard";
}

export function validate_dish_type(dish_type){
    return dish_type === "starter" || dish_type === "main_dish" || dish_type === "dessert";
}

export function validate_step_info(step, ignore_recipe_id = false){
    const { related_recipe_id, step_number, name, description, estimated_time_in_seconds } = step;

    if ((!ignore_recipe_id && !related_recipe_id) || !step_number || !name || !estimated_time_in_seconds){
        console.error("following fields are mandatory for steps : related_recipe_id, step_number, name, estimated_time_in_seconds")
        return {valid: false, message: "fields related_recipe_id, step_number, name, and estimated_time_in_seconds are mandatory for steps"}
    }

    

    if (!Number.isInteger(step_number) || !Number.isInteger(estimated_time_in_seconds) ||
     step_number < 1 || estimated_time_in_seconds < 1){
        console.error("step_number and estimated_time_in_seconds must be strictly positive integers.")
        return {valid: false, message: "step_number and estimated_time_in_seconds must be strictly positive integeres."}
    }

    return {valid: true, message: ""}
}