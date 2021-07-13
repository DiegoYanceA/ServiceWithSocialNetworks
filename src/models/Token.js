const { Schema, model } = require("mongoose");

const serverSchema = new Schema({
    token: String,
    tokenRefresh: String,
    platform: String
})

module.exports = model("Token", serverSchema);