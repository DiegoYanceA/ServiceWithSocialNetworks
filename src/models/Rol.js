const { Schema, model } = require("mongoose");

const rolSchema = new Schema({
    name: String
})

module.exports = model("Rol", rolSchema);