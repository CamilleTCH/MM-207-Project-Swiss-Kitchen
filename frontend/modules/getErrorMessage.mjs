
import { currentLanguage as cL } from "../global_stuff.mjs";
import { getErrorMessageTranslations as gEMT } from "../translations.mjs";

export function getErrorMessage(err) {
    if (err.status === 401) return gEMT.unauthorized[cL];
    else if (err.status === 400) return gEMT.clientError[cL];
    else if (err.status === 404) return gEMT.notFound[cL];
    else if (err.status === 409) return gEMT.conflict[cL];
    else if (err.status === 500) return gEMT.serverError[cL];
    else return gEMT.generic[cL];
}
