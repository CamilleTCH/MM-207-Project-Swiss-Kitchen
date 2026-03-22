import { getUser } from "../global_stuff.mjs";

import loadView from "../modules/viewLoader.mjs";
import UserPanel from "../user-panel.mjs";

import router from "../modules/router.mjs";

customElements.define("user-panel", UserPanel);

function userController(targetApp) {
    render(targetApp);
}


async function render(targetApp) {
    if (!getUser()) {
        router.navigate("login");
        return;
    }

    const userView = await loadView("userView");
    targetApp.innerHTML = "";
    targetApp.appendChild(document.importNode(userView.content, true));
}


export default userController;