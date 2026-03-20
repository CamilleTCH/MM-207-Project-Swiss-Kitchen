import { getUser, setUser, clearUser, getJwtToken } from "./global_stuff.mjs";
import { delete_, put } from "./modules/fetchManager.mjs";

import router from './modules/router.mjs';



class UserPanel extends HTMLElement {
    connectedCallback() {
        this.render();
    }

    render() {
        console.log("RENDERING");
        const user = getUser();
        if (!user) return;

        this.innerHTML = `
            <p>Username: <strong id="username">${user.username}</strong></p>
            <p>Email: <strong id="email">${user.email}</strong></p>
            <h3>Edit account</h3>
            <form id="edit-form">
                <label for="new-username">New username</label>
                <input type="text" id="new-username" placeholder="${user.username}">
                <label for="new-email">New email</label>
                <input type="email" id="new-email" placeholder="${user.email}">
                <label for="new-password">New password</label>
                <input type="password" id="new-password">
                <button type="submit">Save changes</button>
                <p id="edit-error" role="alert" aria-live="polite"></p>
                <p id="edit-success" aria-live="polite"></p>
            </form>
            <hr>
            <button id="logout-button">Logout</button>
            <button id="delete-button">Delete my account</button>
            <p id="delete-error" role="alert" aria-live="polite"></p>
        `;

        this.querySelector("#edit-form").addEventListener("submit", async (e) => {
            e.preventDefault();
            await this.handleEdit(user);
        });

        this.querySelector("#logout-button").addEventListener("click", () => {
            clearUser();
            router.navigate("home");

            window.dispatchEvent(new CustomEvent("session-changed"));
        });

        this.querySelector("#delete-button").addEventListener("click", async () => {
            await this.handleDelete(user)
        });
    }

    async handleEdit(user) {
        const username = this.querySelector("#new-username").value;
        const email = this.querySelector("#new-email").value;
        const password = this.querySelector("#new-password").value;
        const errorEl = this.querySelector("#edit-error");
        const successEl = this.querySelector("#edit-success");

        errorEl.textContent = "";
        successEl.textContent = "";

        const body = {};
        let atLeastOneChange = false;
        if (username) {
            body.username = username; atLeastOneChange = true;
        }
        if (email) {
            body.email = email; atLeastOneChange = true;
        }
        if (password) {
            body.password = password; atLeastOneChange = true;
        }

        if (!atLeastOneChange) return;

        try {
            const data = await put(`./api/users/${user.id}`, body);
            console.log("J'AI EU COMME DATA");
            console.log(data);
            const updatedUser = { ...data.user };

            setUser(updatedUser, getJwtToken());
            successEl.textContent = "Account updated successfully.";
            this.querySelector("#username").textContent = updatedUser.username;
            this.querySelector("#email").textContent = updatedUser.email;

        } catch (err) {
            console.log("Erreur");
            console.log(err);
        }
    }

    async handleDelete(user) {
        const errorEl = this.querySelector("#delete-error");
        errorEl.textContent = "";

        const confirmed = window.confirm(
            "All your recipes will also be deleted. Are you sure you want to do this?"
        );
        if (!confirmed) return;

        try {
            await delete_(`./api/users/${user.id}`)
            clearUser();
            window.dispatchEvent(new CustomEvent("session-changed"));
            router.navigate("home");
        } catch (err) {
            console.log("Erreur");
            console.log(err);
        }
    }
}



export default UserPanel;