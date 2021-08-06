const Background = require("../models/Background");
const User = require("../models/User");
const Rol = require("../models/Rol");

var findRole = async (req, res) => {
    const user = await User.findById(req.userId, {password: 0});
    var msg = "";

    if(!user){
        msg = "No tiene acceso para realizar esta operación."

        return res.json({
            msg: msg,
            error: true
        })
    }
    const rol = await Rol.findById(user.rol);
    
    if(!rol[req.createApi]){
        msg = "No tiene acceso para realizar esta operación."

        return res.json({
            msg: msg,
            error: true
        })
    }
}

exports.createBackground =  async (req, res, next) => {

    req.createApi = "create";
    await findRole(req, res);

    const { image, type } = req.body;
    
    if(!image){
        msg = "El campo imagen no puede estar vacio."

        return res.json({
            msg: msg,
            error: true
        })
    }

     var background = new Background({
        image: image.trim()
    })
    

    await background.save();

    msg = "Registrado correctamente."

    return res.json({
        msg: msg,
        error: false
    })
};

exports.getAllBackgrounds =  async (req, res, next) => {
    // await findRole(req, res);
    const backgrounds = await Background.find();
    return res.json({
        backgrounds: backgrounds
    })
};


exports.deleteBackground =  async (req, res, next) => {
    req.createApi = "delete";
    await findRole(req, res);
    
    const { id } = req.params;
    if(!id){
        msg = "El campo id no puede estar vacio."

        return res.json({
            msg: msg
        })
    }

    await Background.deleteOne({ _id: id });

    msg = "elimniado correctamente.";

    return res.json({
        msg: msg
    })
};