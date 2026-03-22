import loadView from "../modules/viewLoader.mjs";
import { setUser } from "../global_stuff.mjs";
import router from "../modules/router.mjs";
import { post } from "../modules/fetchManager.mjs";
import find from "../modules/findElement.mjs";
import HTTP from "../modules/http.mjs"


function loginController(targetApp) {
    render(targetApp);
}

async function render(targetApp) {
    const loginView = await loadView("loginView");
    targetApp.innerHTML = "";
    targetApp.appendChild(document.importNode(loginView.content, true));

    find("#login-form").addEventListener("submit", async (e) => {
        e.preventDefault();
        const email = find("#login-email").value;
        const password = find("#login-password").value;
        const errorEl = find("#login-error");
        errorEl.textContent = "";

        try {
            const data = await post("./api/users/login", { email, password });
            setUser(data.user, data.token);
            window.dispatchEvent(new CustomEvent("session-changed"));
            router.navigate("home");
        } catch (err) {
            if (err.status === HTTP.clientErrorCodes.UNAUTHORIZED){
                find("#login-error").textContent = "Invalid email or password";
            }
            console.log("Erreur");
            console.log(err);
        }
    });
}


export default loginController;