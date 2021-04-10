const { Schema, model } = require("mongoose");

const serverSchema = new Schema({
    name: String,
    range: Boolean,
    ip: String,
    nameServer: String
})

module.exports = model("Server", serverSchema);