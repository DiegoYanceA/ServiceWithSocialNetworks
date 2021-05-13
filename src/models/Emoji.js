const { Schema, model } = require("mongoose");

const emojiSchema = new Schema({
    image: String,
    type: String
})

module.exports = model("Emoji", emojiSchema);