import { get } from "../modules/fetchManager.mjs";
import HTTP from "../modules/http.mjs";
import loadView from "../modules/viewLoader.mjs";
import errorController from "./errorController.mjs";
import find  from "../modules/findElement.mjs"

import { currentLanguage as cL } from "../global_stuff.mjs";
import { recipePageTranslations as rPT } from "../translations.mjs";

const stepTemplate = await loadView("recipeStepView");  // TODO do the same with the recipeView 


function recipeController(targetApp, recipeId) {
    render(targetApp, recipeId);
}

async function render(targetApp, recipeId) {
    console.log("Recipe id");
    console.log(recipeId);
    const recipeView = await loadView("recipeView");
    targetApp.innerHTML = "";
    targetApp.appendChild(document.importNode(recipeView.content, true));

    try {
        const data = await get(`api/recipes/${recipeId}`);
        const recipe = data.recipe;

        find("#recipe-name").textContent = recipe.name;
        find("#recipe-description").textContent = recipe.description || rPT.noRecipeDescription[cL];
        find("#recipe-type").textContent = recipe.dish_type;
        find("#recipe-difficulty").textContent = recipe.difficulty_level;
        find("#recipe-author").textContent = recipe.creator_username;

        const stepList = find("#step-list");

        recipe.steps.sort((a, b) => a.step_number - b.step_number);
        for (const step of recipe.steps){
            
            const stepItem = document.importNode(stepTemplate.content, true);
            const minutes = Math.floor(step.estimated_time_in_seconds / 60);
            const seconds = step.estimated_time_in_seconds % 60;

            find("#step-name", stepItem).textContent = `Step #${step.step_number} - ${step.name}`;
            find("#step-description", stepItem).textContent = `${step.description || rPT.noStepDescription[cL]}`;
            find("#step-duration", stepItem).textContent = `${minutes}m ${seconds}s`;   // TODO add localization format ?

            stepList.appendChild(stepItem);
        }
    
    } catch (err){
        if (err.status === 404){
            errorController(targetApp, HTTP.clientErrorCodes.NOT_FOUND, "The page your looking for is in another bank.");
        } else {
            errorController(targetApp, err.status, "OH. Unexpected error. Check your console.");
        }
        
        console.log(err);
    }
}


export default recipeController;

