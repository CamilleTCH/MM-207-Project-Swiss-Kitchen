import jwt from "jsonwebtoken";
import { http_code } from "../global_stuff.mjs";

function hasAuthenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1]

    if (!token) {
        return res.status(http_code.unauthorized).json({ error: "Access token required" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(http_code.forbidden).json({ error: "Invalid or expired token" });
        }
        req.user = user;
        next();
    });
}

export default hasAuthenticateToken;