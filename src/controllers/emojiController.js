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
    
    if(rol.name != "ADMIN"){
        msg = "No tiene acceso para realizar esta operación."

        return res.json({
            msg: msg,
            error: true
        })
    }
}

exports.createEmoji =  async (req, res, next) => {
    
    await findRole(req, res);

    const { image, type } = req.body;
    
    if(!image){
        msg = "El campo imagen no puede estar vacio."

        return res.json({
            msg: msg,
            error: true
        })
    }

    const emoji = new Emoji({
        type: type,
        image: image
    })

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
    
    await findRole(req, res);
    
    const { id } = req.params;
    if(!id){
        msg = "El campo id no puede estar vacio."

        return res.json({
            msg: msg
        })
    }

    await Emoji.deleteOne({ _id: id });

    msg = "elimniado correctamente.";

    return res.json({
        msg: msg
    })
};