import { get } from "../modules/fetchManager.mjs";
import HTTP from "../modules/http.mjs";
import loadView from "../modules/viewLoader.mjs";
import errorController from "./errorController.mjs";
import find  from "../modules/findElement.mjs"


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

        console.log(`La recipe : ${recipe}, et ce qu'on trouve ${find("#recipe-name")}`);

        find("#recipe-name").textContent = recipe.name;
        find("#recipe-description").textContent = recipe.description ?? "";
        find("#recipe-type").textContent = recipe.dish_type;
        find("#recipe-difficulty").textContent = recipe.difficulty_level;
        find("#recipe-author").textContent = recipe.creator_username;
    
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

