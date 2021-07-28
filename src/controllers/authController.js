const User = require("../models/User");
const Rol = require("../models/Rol");
const jwt = require("jsonwebtoken");
const secretKey = process.env.SECTRE_KEY_ASDIEGOYA;

exports.signup =  async (req, res, next) => {
    const { username, password, key} = req.body;
    var msg = "";
    if(key != 'SoyRealPe'){
        return res.json({
            auth: false,
            msg: "Pendejo te crees :v"
        });
    }

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
    const rol = await Rol.findById(user.rol);
    if(!user){
        msg = "El usuario no existe."
        return res.json({
            auth: false,
            msg: msg,
            rol: rol.name
        });
    }

    const validPassword = await user.validatePassword(password);
    if(!validPassword){
        msg = "La contraseña es incorrecta"
        return res.json({auth: false, msg: msg})
    } 

    if(user.disabled){
        msg = "El usuario ha sido dado de baja, comuniquese con asdiegoYA"
        return res.json({auth: false, msg: msg})
    }

    //6 Horas con el token
    const token = jwt.sign({id: user._id}, secretKey,{
        expiresIn: 6 * 60 * 60
    })

    return res.json({auth: true, token: token, expiredJWT: req.expired_at })
};

// exports.signout = async (req, res, next) => {
//     var { token } = req.body;
//     var destroy = jwt.destroy(token)
//     console.log(destroy)
//     return res.json({
//         msg: "Se ha cerrado la sesión correctamente."
//     })
// }

exports.existUser = async (req, res, next) => {
    
    const user = await User.findById(req.userId, {password: 0});
    const rol = await Rol.findById(user.rol);

    if(!user){
        return res.json({
            msg: "El usuario no existe."
        })
    }
    return res.json({
        user: user,
        msg: "Tiene acceso a este recurso.",
        expired_at: req.expired_at,
        auth: true,
        rol: rol.name
    })
}