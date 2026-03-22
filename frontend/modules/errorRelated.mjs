import { getErrorMessageTranslations as gEMT } from "../translations.mjs";

import { debugMode, clearUser, currentLanguage as cL } from "../global_stuff.mjs";
import router from "./router.mjs";

export function getErrorMessage(err) {
    if (debugMode) {
        console.log(err);
    }

    if (err.status === 401) return gEMT.unauthorized[cL];
    else if (err.status === 400) return gEMT.clientError[cL];
    else if (err.status === 404) return gEMT.notFound[cL];
    else if (err.status === 409) return gEMT.conflict[cL];
    else if (err.status === 500) return gEMT.serverError[cL];
    else return gEMT.generic[cL];
}


export function handleUnauthorized() {
    clearUser();
    window.dispatchEvent(new CustomEvent("session-changed"));
    router.navigate("login");
}
