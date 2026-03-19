import HTTP from "./http.mjs";
import { debugMode } from "../global_stuff.mjs";

async function get(url, contentType = HTTP.contentTypes.application.json) {
    return await runRequest(HTTP.methods.GET, url, null, contentType);
}


async function post(url, data, contentType = HTTP.contentTypes.application.json) {
    return await runRequest(HTTP.methods.POST, url, data, contentType);
}


async function runRequest(method, url, data, contentType) {
    if (debugMode) console.log(`Sending request ${url}, with data ${data}`);
    const headers = {
        method,
        headers: {
            'Content-Type': contentType,
        }
    };

    if (data) {
        headers.body = JSON.stringify(data);
    }

    let response = await fetch(url, headers);

    if (debugMode) {
        console.log("Request response");
        console.log(response);
    }

    if (contentType == HTTP.contentTypes.application.json) {
        if (!response.ok){
            throw { status : response.status, message: response.error}
        }
        response = await response.json();
    } else {
        response = await response.text();
    }

    return response;

}

export { get, post }