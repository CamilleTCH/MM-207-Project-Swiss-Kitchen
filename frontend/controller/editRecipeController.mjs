import { getUser } from "../global_stuff.mjs";
import router from "../modules/router.mjs";

import { get, put, post, delete_ } from "../modules/fetchManager.mjs";

import { currentLanguage as cL } from "../global_stuff.mjs";
import { editRecipePageTranslations as eDRPT } from "../translations.mjs";

import find from "../modules/findElement.mjs";

import { getErrorMessage } from "../modules/getErrorMessage.mjs";
import loadView from "../modules/viewLoader.mjs";


const default_estimated_time_in_seconds = 60;


function editRecipeController(targetApp, id) {
    if (!getUser()) {
        router.navigate("login");
        return;
    }
    render(targetApp, id);
}



async function render(targetApp, id) {
    const view = await loadView("editRecipeView");
    targetApp.innerHTML = ""
    targetApp.appendChild(document.importNode(view.content, true));
    try {
        const data = await get(`./api/recipes/${id}`);
        const recipe = data.recipe;

        find("#recipe-name").value = recipe.name;
        find("#recipe-description").value = recipe.description ?? `${eDRPT.noRecipeDescription[cL]}`;
        find("#recipe-dish-type").value = recipe.dish_type;
        find("#recipe-difficulty").value = recipe.difficulty_level;

        renderSteps(recipe.steps, id);

        find("#add-step-button").addEventListener("click", async () => onAddStep(id));

        find("#edit-recipe-form").addEventListener("submit", async (e) => {
            e.preventDefault();
            onEditRecipe(id);
        });

    } catch (err) {
        targetApp.textContent = getErrorMessage(err);
        console.log(err);
    }
}

async function onAddStep(recipeId) {
    const errorEl = find("#steps-error");
    errorEl.textContent = "";

    const currentSteps = document.querySelectorAll(".step-form");
    const nextStepNumber = currentSteps.length + 1;

    try {
        await post(`./api/recipes/${recipeId}/steps`, {
            name: `Step ${nextStepNumber}`,
            estimated_time_in_seconds: default_estimated_time_in_seconds,
            step_number: nextStepNumber
        });
        const updatedListOfSteps = await get(`./api/recipes/${recipeId}`);
        renderSteps(updatedListOfSteps.recipe.steps, recipeId);
    } catch (err) {
        errorEl.textContent = getErrorMessage(err);
        console.log(err);
    }
}


async function onEditRecipe(recipeId) {
    const errorEl = find("#edit-error");
    errorEl.textContent = "";

    const body = {
        name: find("#recipe-name").value,
        description: find("#recipe-description").value,
        dish_type: find("#recipe-dish-type").value,
        difficulty_level: find("#recipe-difficulty").value,
    }

    try {
        await put(`./api/recipes/${recipeId}`, body);
        router.navigate("my-recipes");
    } catch (err) {
        errorEl.textContent = getErrorMessage(err);
        console.log(err);
    }
}



function renderSteps(steps, recipeId) {
    const stepsContainer = find("#steps-container");
    stepsContainer.innerHTML = "";

    for (const step of steps) {
        const li = document.createElement("li");
        li.className = "step-form";
        li.dataset.stepNumber = step.step_number;
        li.innerHTML = `
            <input type="text" id="step-name" value="${step.name}">
            <textarea id="step-description">${step.description ?? eDRPT.noStepDescription[cL]}</textarea>
            <input type="number" id="step-duration" value="${step.estimated_time_in_seconds}" min="1">
            <button type="button" id="save-step-button">Save</button>
            <button type="button" id="remove-step-button">Remove</button>
            <span id="step-success" aria-live="polite"></span>
            <span id="step-error" role="alert" aria-live="polite"></span>
        `;

        li.querySelector("#save-step-button").addEventListener("click", async () => { 
            const errorEl = li.querySelector("#step-error");
            const successEl = li.querySelector("#step-success");
            errorEl.textContent = "";
            successEl.textContent = "";

            try {
                await put(`./api/recipes/${recipeId}/steps/${step.step_number}`, {
                    name: li.querySelector("#step-name").value,
                    description: li.querySelector("#step-description").value,
                    estimated_time_in_seconds: parseInt(li.querySelector("#step-duration").value)
                });
                successEl.textContent = "Saved.";
            } catch (err) {
                errorEl.textContent = getErrorMessage(err);
                console.log(err);
            }
        });

        li.querySelector("#remove-step-button").addEventListener("click", async () => {
            const confirmed = window.confirm("Remove this step?");
            if (!confirmed) return;

            const errorEl = find("#steps-error");
            try {
                await delete_(`./api/recipes/${recipeId}/steps/${step.step_number}`);
                const updated = await get(`./api/recipes/${recipeId}`);
                renderSteps(updated.recipe.steps, recipeId);
            } catch (err) {
                errorEl.textContent = getErrorMessage(err);
                console.log(err);
            }
        });
        stepsContainer.appendChild(li);
    }
}



export default editRecipeController;