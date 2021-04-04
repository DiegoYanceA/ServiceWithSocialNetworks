const User = require("../models/User");
const jwt = require("jsonwebtoken");

exports.signup =  async (req, res, next) => {
    const { username, email, password} = req.body;
    var msg = "";

    if(!(username && email && password)) {
        
        msg = "Los campos no deben estar vacios."
        return res.json({
            auth: false,
            msg: msg
        });
    }

    const existUser = await User.findOne({ email: email });

    if(existUser){
        msg = "El usuario ya existe."
        return res.json({
            auth: false,
            msg: msg
        });
    }

    const user = new User({
        username: username,
        email: email,
        password: password
    })

    user.password = await user.encryptPassword(user.password);
    await user.save();

    const token = jwt.sign({id: user._id}, "token_asdiegoya",{
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
    const { email, password} = req.body;
    var msg = "";

    if(!(email && password)) {
        
        msg = "Los campos no deben estar vacios."
        return res.json({
            auth: false,
            msg: msg
        });
    }

    const user = await User.findOne({email: email})

    if(!user){
        msg = "El usuario no existe."
        return res.status(404).json({
            auth: false,
            msg: msg
        });
    }

    const validPassword = await user.validatePassword(password);
    if(!validPassword){
        return res.status(401).json({auth: false, token: null})
    } 

    const token = jwt.sign({id: user._id}, "token_asdiegoya",{
        expiresIn: 60 * 3
    })

    return res.status(401).json({auth: true, token: token })
};

exports.me = async (req, res, next) => {
    
    const user = await User.findById(req.userId, {password: 0});
    
    if(!user){
        return res.json({
            msg: "El usuario no existe."
        })
    }

    return res.json({
        user: user,
        msg: "Tiene acceso a este recurso.",
        user: user
    })
}