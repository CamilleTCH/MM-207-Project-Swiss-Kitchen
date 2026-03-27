import { setUser } from "../global_stuff.mjs"
import find from "../modules/findElement.mjs";
import { post } from "../modules/fetchManager.mjs";
import loadView from "../modules/viewLoader.mjs";
import router from "../modules/router.mjs";
import { getErrorMessage } from "../modules/errorRelated.mjs";
import { currentLanguage as cL } from "../global_stuff.mjs";
import { registerTranslations as rT } from "../translations.mjs";

function registerController(targetApp) {
    render(targetApp);
}

async function render(targetApp) {
    const registerView = await loadView("registerView");
    targetApp.innerHTML = "";
    targetApp.appendChild(document.importNode(registerView.content, true));

    fillTranslations();

    find("#register-form").addEventListener("submit", async (e) => {
        e.preventDefault();
        const username = find("#register-username").value;
        const email = find("#register-email").value;
        const password = find("#register-password").value;
        const gdprChecked = find("#register-gdpr-checkbox").checked;
        const errorEl = find("#register-error");
        errorEl.textContent = "";

        if (!gdprChecked) {
            errorEl.textContent = rT.gdprRequired[cL];
            return;
        }

        try {
            const data = await post("./api/users/register", { username, email, password });
            setUser(data.user);
            window.dispatchEvent(new CustomEvent("session-changed"));
            router.navigate("home");
        } catch(err) {
            errorEl.textContent = getErrorMessage(err);
        }
    });
}

function fillTranslations() {
    find("#register-title").textContent = rT.title[cL];
    find("#register-username-label").textContent = rT.usernameLabel[cL];
    find("#register-email-label").textContent = rT.emailLabel[cL];
    find("#register-password-label").textContent = rT.passwordLabel[cL];
    find("#register-gdpr-label").textContent = rT.gdprLabel[cL];
    find("#register-submit-button").textContent = rT.submitButton[cL];
    find("#register-already-account-text").textContent = rT.alreadyHaveAccount[cL];
    find("#register-login-link").textContent = rT.loginLink[cL];
    find("#register-login-link").href = "#login";
}

export default registerController;