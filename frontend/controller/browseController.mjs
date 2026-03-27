import loadView from "../modules/viewLoader.mjs";
import { get } from "../modules/fetchManager.mjs";
import router from "../modules/router.mjs"
import find from "../modules/findElement.mjs";

import { currentLanguage as cL} from "../global_stuff.mjs";
import { browsePageTranslations as bPT } from "../translations.mjs";

import { getErrorMessage } from "../modules/errorRelated.mjs";

const recipeCardTemplate = await loadView("recipeCardView");

function browseController(targetApp) {
    render(targetApp);
}

async function render(targetApp) {
    const browseView = await loadView("browseView");
    targetApp.innerHTML = "";
    targetApp.appendChild(document.importNode(browseView.content, true));

    loadViewTranslations();

    try {
        const data = await get("./api/recipes");
        const recipeList = find("#recipe-list");

        for (const recipe of data.recipes) {
            const recipeItem = document.importNode(recipeCardTemplate.content, true);
            
            find("#recipe-name", recipeItem).textContent = recipe.name;
            find("#recipe-description", recipeItem).textContent = recipe.description || bPT.noRecipeDescription[cL];
            find("#recipe-type", recipeItem).textContent = recipe.dish_type;

            find("#recipe-difficulty", recipeItem).textContent = recipe.difficulty_level;
            find("#recipe-author", recipeItem).textContent = `${bPT.byText[cL]} ${recipe.creator_username}`;

            const card = find(".recipe-card", recipeItem);
            card.addEventListener("click", () => router.navigate(`recipe/${recipe.id}`));

            recipeList.appendChild(recipeItem);
        }

    } catch (err) {
        find("#recipe-list").textContent = getErrorMessage(err);
    }
}

async function loadViewTranslations(){
    document.getElementById("browse-h1").textContent = bPT.browseRecipes[cL];
}

export default browseController;