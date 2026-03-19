import { setUser } from "../global_stuff.mjs"
import find from "../modules/findElement.mjs";
import { post } from "../modules/fetchManager.mjs";
import loadView from "../modules/viewLoader.mjs";

import router from "../modules/router.mjs";

function registerController(targetApp) {
    render(targetApp);
}

async function render(targetApp){
    const registerView = await loadView("registerView");
    targetApp.innerHTML = "";
    targetApp.appendChild(document.importNode(registerView.content, true));

    find("#register-form").addEventListener("submit", async (e) => {
        e.preventDefault();     // otherwise page will reload
        const username = find("#register-username").value;
        const email = find("#register-email").value;
        const password = find("#register-password").value;
        const errorEl = find("#register-error");
        errorEl.textContent = "";

        try {
            const data = await post("./api/users/register", { username, email, password });
            setUser(data.user);
            window.dispatchEvent(new CustomEvent("session-changed"));
            router.navigate("home");
            
        } catch(err){
            console.log("Error in register");
            console.log(err);
            // catch le fait que le user existe déjà
        }
    });
}

export default registerController;
