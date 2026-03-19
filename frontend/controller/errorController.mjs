import loadView from "../modules/viewLoader.mjs"
import find from "../modules/findElement.mjs";

function errorController(targetApp, code, message){
    render(targetApp, code, message);
}

async function render(targetApp, code, message){
    console.log("On est bien là");
    const errorView = await loadView("errorView");

    targetApp.innerHTML = "";
    targetApp.appendChild(document.importNode(errorView.content, true));

    find("#error-code").textContent = code;
    find("#error-message").textContent = message;
}

export default errorController;