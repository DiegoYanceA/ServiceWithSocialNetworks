const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs")

const userSchema = new Schema({
    username: String,
    password: String,
    rol: { type: String, default: "60708ab5200b436f7b579222" },
    disabled: { type: Boolean, default: false }
})

userSchema.methods.encryptPassword = async (password) => {

    //Hast  de password
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
}

userSchema.methods.validatePassword = function (password) {
    return bcrypt.compare(password, this.password);
}

module.exports = model("User", userSchema);