import loadView from "../modules/viewLoader.mjs"
import find from "../modules/findElement.mjs";

import { errorTranslations } from "../translations.mjs";
import { currentLanguage } from "../global_stuff.mjs";

function errorController(targetApp, code, message){
    render(targetApp, code, message);
}

async function render(targetApp, code, message){
    const errorView = await loadView("errorView");

    targetApp.innerHTML = "";
    targetApp.appendChild(document.importNode(errorView.content, true));

    find("#error-code").textContent = code;
    find("#error-message").textContent = message;
    find("#back-home-button").textContent = errorTranslations.backHomeButton[currentLanguage];
}

export default errorController;