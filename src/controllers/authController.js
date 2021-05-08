const User = require("../models/User");
const jwt = require("jsonwebtoken");
const secretKey = process.env.SECTRE_KEY_ASDIEGOYA;

exports.signup =  async (req, res, next) => {
    const { username, password} = req.body;
    var msg = "";

    if(!(username && password)) {
        
        msg = "Los campos no deben estar vacios."
        return res.json({
            auth: false,
            msg: msg
        });
    }

    const existUser = await User.findOne({ username: username });

    if(existUser){
        msg = "El usuario ya existe."
        return res.json({
            auth: false,
            msg: msg
        });
    }

    const user = new User({
        username: username,
        password: password
    })

    user.password = await user.encryptPassword(user.password);
    await user.save();

    const token = jwt.sign({id: user._id}, secretKey,{
        expiresIn: 60 * 3
    })

    msg = "Registrado correctamente."

    return res.json({
        auth: true,
        token: token,
        msg: msg
    })

    
};

exports.signin = async (req, res, next) => {
    const { username, password} = req.body;
    var msg = "";

    if(!(username && password)) {
        
        msg = "Los campos no deben estar vacios."
        return res.json({
            auth: false,
            msg: msg
        });
    }

    const user = await User.findOne({username: username})

    if(!user){
        msg = "El usuario no existe."
        return res.json({
            auth: false,
            msg: msg
        });
    }

    const validPassword = await user.validatePassword(password);
    if(!validPassword){
        msg = "La contraseña es incorrecta"
        return res.json({auth: false, msg: msg})
    } 

    const token = jwt.sign({id: user._id}, secretKey,{
        expiresIn: 2 * 60 * 60
    })

    return res.json({auth: true, token: token })
};

exports.home = async (req, res, next) => {
    
    const user = await User.findById(req.userId, {password: 0});
    var expired = req.expiredJWT;
    // var date = new Date(expired).toLocaleString();
    // console.log(date)
    if(!user){
        return res.json({
            msg: "El usuario no existe."
        })
    }
    return res.json({
        user: user,
        msg: "Tiene acceso a este recurso.",
        expired: expired,
        auth: true
    })
}