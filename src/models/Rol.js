const { Schema, model } = require("mongoose");

const rolSchema = new Schema({
    name: String,
    create: { type: Boolean, default: false },
    delete: { type: Boolean, default: false },
    update: { type: Boolean, default: false }
})

module.exports = model("Rol", rolSchema);