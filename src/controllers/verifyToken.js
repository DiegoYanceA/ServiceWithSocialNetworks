const jwt = require("jsonwebtoken");

function verifyToken (req, res, next){
    const token = req.headers['x-access-token'];
    if(!token){
        return res.status(401).json({
            auth: false,
            msg: "No tiene acceso a este recurso."
        })
    }

    const decoded = jwt.verify(token, "token_asdiegoya");
    req.userId = decoded.id;
    next();
}

module.exports = verifyToken;