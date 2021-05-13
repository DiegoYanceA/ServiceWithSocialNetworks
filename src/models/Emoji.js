const { Schema, model } = require("mongoose");

const emojiSchema = new Schema({
    image: String,
    type: { type: String, default: 'Random' }
})

module.exports = model("Emoji", emojiSchema);