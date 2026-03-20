import loadView from "../modules/viewLoader.mjs";
import { isLoggedIn } from "../global_stuff.mjs";
import find from "../modules/findElement.mjs";


function navController() {
    render();
    window.addEventListener("session-changed", render);
}

async function render() {
    const navView = await loadView("navView");
    const nav = find("#nav-container");
    nav.innerHTML = "";
    nav.appendChild(document.importNode(navView.content, true));

    const slot = find("#nav-user-slot", nav);

    if (isLoggedIn()) {
        slot.innerHTML = `<a href="#user">My account</a>`;
    } else {
        slot.innerHTML = `<a href="#login">Login</a>
                            <a href="#register">Register</a>`;
    }
}

export default navController;