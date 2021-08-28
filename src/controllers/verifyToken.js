const jwt = require("jsonwebtoken");
const secretKey = process.env.SECTRE_KEY_ASDIEGOYA;

function verifyToken (req, res, next){
    const token = req.headers['x-access-token'];

    if(!token){
        return res.json({
            auth: false,
            msg: "No tiene acceso a este recurso."
        })
    }
    try {
        const decoded = jwt.verify(token, secretKey);
        // console.log(decoded)
        req.expired_at = decoded.exp - Math.floor(Date.now() / 1000);
        req.userId = decoded.id;
        next();
    } catch(e){
        // res.redirect("/")
        return res.json({
            auth: false,
            msg: "No tiene acceso a este recurso."
        })
    }
}

function verifyTokenPermission (req, res, next){
    const token = req.headers['x-access-token'];

    if(!token){
        return res.json({
            auth: false,
            msg: "No tiene acceso a este recurso."
        })
    }
    try {
        const decoded = jwt.verify(token, secretKey);
        // console.log(decoded)
        req.expired_at = decoded.exp - Math.floor(Date.now() / 1000);
        req.userId = decoded.id;
        next();
    } catch(e){
        // res.redirect("/")
        return res.json({
            auth: false,
            msg: "No tiene acceso a este recurso."
        })
    }
}

module.exports = {verifyToken, verifyTokenPermission};