const { Schema, model } = require("mongoose");

const resourceSchema = new Schema({
    rol: String,
    resource: String,
    create: Boolean,
    delete: Boolean,
    update: Boolean,
    read: Boolean,
    enable: Boolean,
})

module.exports = model("Permission", resourceSchema);