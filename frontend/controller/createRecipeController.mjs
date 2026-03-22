import router from "../modules/router.mjs";
import { getErrorMessage } from "../modules/errorRelated.mjs";

import { post } from "../modules/fetchManager.mjs";
import loadView from "../modules/viewLoader.mjs";

import find from "../modules/findElement.mjs";

import { getUser } from "../global_stuff.mjs";

const stepTemplate = await loadView("stepFormView");
import HTTP from "../modules/http.mjs";

function createRecipeController(targetApp) {
    if (!getUser()) {
        router.navigate("login");
        return;
    }
    render(targetApp);
}

async function render(targetApp) {
    const view = await loadView("createRecipeView");
    targetApp.innerHTML = "";
    targetApp.appendChild(document.importNode(view.content, true));

    find("#add-step-button").addEventListener("click", () => addStep());

    find("#create-recipe-form").addEventListener("submit", async (e) => {
        e.preventDefault()
        const errorEl = find("#create-error");
        errorEl.textContent = "";

        const user = getUser();
        const steps = collectSteps();

        const nameValue = find("#recipe-name").value;
        const descriptionValue = find("#recipe-description").value;
        const dishTypeValue = find("#recipe-dish-type").value;
        const difficultyLevelValue = find("#recipe-difficulty").value;

        const body = {
            name: nameValue,
            description: descriptionValue,
            dish_type: dishTypeValue,
            difficulty_level: difficultyLevelValue,
            creator_user_id: user.id,
            steps
        }

        try {
            await post("./api/recipes", body);
            router.navigate("my-recipes");
        } catch (err) {
            if (err.status === HTTP.clientErrorCodes.UNAUTHORIZED) {
                handleUnauthorized();
                return;
            }
            errorEl.textContent = getErrorMessage(err);
        }
    });
}

function addStep() {
    const container = find("#steps-container");
    const stepItem = document.importNode(stepTemplate.content, true);

    find("#remove-step-button", stepItem).addEventListener("click", (e) => {
        e.target.closest(".step-form").remove();
    });

    container.appendChild(stepItem);
}

function collectSteps() {
    const stepForms = document.querySelectorAll(".step-form");
    const steps = [];

    for (const form of stepForms) {
        const nameValue = form.querySelector("#step-name").value.trim();
        const descriptionValue = form.querySelector("#step-description").value.trim();
        const timeSecondsValue = parseInt(form.querySelector("#step-duration").value);

        if (nameValue && timeSecondsValue) {
            steps.push({
                name: nameValue,
                description: descriptionValue,
                estimated_time_in_seconds: timeSecondsValue,
                step_number: steps.length + 1
            });
        }
    }

    return steps;
}

export default createRecipeController;