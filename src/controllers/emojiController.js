const Emoji = require("../models/Emoji");
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

exports.createEmoji =  async (req, res, next) => {
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
    var emoji;
    
    if(type != ""){
        emoji = new Emoji({
            type: type,
            image: image.trim()
        })
    } else {
        emoji = new Emoji({
            image: image.trim()
        })
    }

    

    await emoji.save();

    msg = "Registrado correctamente."

    return res.json({
        msg: msg,
        error: false
    })
};

exports.getAllEmojis =  async (req, res, next) => {
    // await findRole(req, res);
    
    const emojis = await Emoji.find();
    return res.json({
        emojis: emojis
    })
};


exports.deleteEmoji =  async (req, res, next) => {
    req.createApi = "delete";
    await findRole(req, res);
    
    const { id } = req.params;
    if(!id){
        msg = "El campo id no puede estar vacio."

        return res.json({
            msg: msg
        })
    }

    await Emoji.deleteOne({ _id: id });

    msg = "eliminado correctamente.";

    return res.json({
        msg: msg
    })
};

exports.test =  async (req, res, next) => {
    var msg = "gaaa"
    return res.json({
        msg: "Gaaa"
    })
};