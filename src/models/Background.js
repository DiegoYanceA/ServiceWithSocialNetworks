const { Schema, model } = require("mongoose");

const backgroundSchema = new Schema({
    image: String
})

module.exports = model("Background", backgroundSchema);