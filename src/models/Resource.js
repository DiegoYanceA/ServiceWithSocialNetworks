const { Schema, model } = require("mongoose");

const resourceSchema = new Schema({
    name: String,
})

module.exports = model("Resource", resourceSchema);