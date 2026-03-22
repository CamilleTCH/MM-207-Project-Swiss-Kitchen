const SESSION_KEY = "sk_user";
const TOKEN_KEY = "sk_token";


export function setUser(user, token) {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(user));

    if (token === undefined) console.log("UNDEFINED TOKEN ATTENTION");
    sessionStorage.setItem(TOKEN_KEY, token);
}


export function getUser() {
    const raw = sessionStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
}

export function clearUser() {
    sessionStorage.removeItem(SESSION_KEY);
    sessionStorage.removeItem(TOKEN_KEY);
}

export function getJwtToken() {
    return sessionStorage.getItem(TOKEN_KEY);
}

export const languages = {
    en: "en",
    fr: "fr"
}
export const currentLanguage = languages.fr;

export const hashs = {
    home: "home"
}

export const debugMode = true;

const loggedIn = false;

export function isLoggedIn() {
    return getUser() !== null;
}

