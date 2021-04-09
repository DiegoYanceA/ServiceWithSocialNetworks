const { Schema, model } = require("mongoose");

const channelSchema = new Schema({
    idChannel: String,
    rol: String
})

// userSchema.methods.encryptPassword = async (password) => {

//     //Hast  de password
//     const salt = await bcrypt.genSalt(10);
//     return bcrypt.hash(password, salt);
// }

// userSchema.methods.validatePassword = function (password) {
//     return bcrypt.compare(password, this.password);
// }

module.exports = model("Channel", channelSchema);