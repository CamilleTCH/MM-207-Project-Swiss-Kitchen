import { get } from "./fetchManager.mjs"
import HTTP from "./http.mjs";

async function loadView(name) {
    let viewTemplateRaw = await get(`./view/${name}.html`, HTTP.contentTypes.text.html);
    const template = document.createElement("template");
    template.innerHTML = viewTemplateRaw;
    return template;
}

export default loadView