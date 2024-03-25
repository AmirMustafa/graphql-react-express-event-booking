// From Header we will pass - Authorization: Bearer <token>

const jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {
    const authHeader = req.get('Authorization'); // Bearer <token>
    if (!authHeader) {
        req.isAuth = false;
        return next();
    }

    const token = authHeader.split(" ")[1]; // <token>
    if (!token || token === "") {
        req.isAuth = false;
        return next();
    }

    let decodedToken;
    try {
        decodedToken = jwt.verify(token, "supersecretkey");
        if (!decodedToken) {
            req.isAuth = false;
            return next();
        }

        // Auth Passed
        req.isAuth = true;
        req.userId = decodedToken.userId;
        next();

    } catch (err) {
        req.isAuth = false;
        return next();
    }
}