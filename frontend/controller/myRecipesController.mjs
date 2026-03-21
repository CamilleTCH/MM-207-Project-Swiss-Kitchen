import { getUser } from "../global_stuff.mjs";
import loadView from "../modules/viewLoader.mjs";

import { currentLanguage as cL } from "../global_stuff.mjs";
import { myRecipePageTranslations as mRPT } from "../translations.mjs";

import { get } from "../modules/fetchManager.mjs";

import find from "../modules/findElement.mjs"

const myRecipeItemTemplate = await loadView("myRecipeItemView");



function myRecipesController(targetApp) {
    if (!getUser()) {
        router.navigate("login");
        return;
    }
    render(targetApp);
}

async function render(targetApp) {
    const myRecipesView = await loadView("myRecipesView");
    console.log("ON A LOAD");
    console.log(myRecipesView.content);
    targetApp.innerHTML = "";
    targetApp.appendChild(document.importNode(myRecipesView.content, true));

    const user = getUser();

    try {
        const data = await get("./api/recipes");
        const myRecipes = data.recipes.filter(r => r.creator_user_id === user.id);
        const listElement = find("#my-recipe-list");
        console.log("LA LONGUEUR");
        console.log(listElement);
        if (myRecipes.length === 0) {

            listElement.innerHTML = "<li>You have no recipes yet.</li>";
            return;
        }

        for (const recipe of myRecipes) {
            const recipeItem = document.importNode(myRecipeItemTemplate.content, true);

            find("#recipe-name", item).textContent = recipe.name;
            find("#recipe-description", item).textContent = recipe.description ?? `${mRPT.noRecipeDescription[cL]}`;
            find("#recipe-type", item).textContent = recipe.dish_type;
            find("#recipe-difficulty", item).textContent = recipe.difficulty_level;

            find("#edit-button", item).addEventListener("click", () => {
                router.navigate(`edit-recipe/${recipe.id}`)
            });


            listElement.appendChild(recipeItem);
        }
        

    } catch(err) {
        console.log("Erreur");
        console.log(err);
    }
}

export default myRecipesController;