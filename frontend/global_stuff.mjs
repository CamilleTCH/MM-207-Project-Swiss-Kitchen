export const languages = {
    en: "en",
    fr: "fr"
}

export const currentLanguage = languages.fr;

export const hashs = {
    home: "home"
}

export const debugMode = true;


const SESSION_KEY = "sk_user";

const loggedIn = false;

export function isLoggedIn() {
    return loggedIn;
}

export function setUser(user) {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(user));
}

export function getUser() {
    const raw = sessionStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
}

export function clearUser() {
    sessionStorage.removeItem(SESSION_KEY);
}