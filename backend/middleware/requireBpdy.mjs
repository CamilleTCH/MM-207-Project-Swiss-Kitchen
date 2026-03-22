import { http_code } from "../global_stuff.mjs";


function requireBody(message = "Request body is required.") {
    return function(req, res, next) {
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(http_code.bad_request).json({ error: message })
        }
        next();
    }
}

export default requireBody;