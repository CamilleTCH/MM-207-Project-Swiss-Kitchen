import { getUser } from "../global_stuff.mjs";

import loadView from "../modules/viewLoader.mjs";
import UserPanel from "../user-panel.mjs";

customElements.define("user-panel", UserPanel);

function userController(targetApp) {
    render(targetApp);
}


async function render(targetApp) {
    console.log("DANS USER RENDER");
    if (!getUser()) {
        router.navigate("login");
        return;
    }

    console.log("Il y a un user");
    const userView = await loadView("userView");
    targetApp.innerHTML = "";
    targetApp.appendChild(document.importNode(userView.content, true));
}


export default userController;