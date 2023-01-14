const mongoose = require("mongoose");
const URI = "mongodb+srv://DiegoYance:6KW6hNocqVyDzxuW@cluster0.kv2lg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(db => {
    console.log("Se conecto a la base de datos")
}).catch(e => {
    console.log(e)
    console.log("No se pudo conectar a la base de datos");
});