const mongoose = require("mongoose");
const URI = "mongodb+srv://asdiegoya:<password>@cluster0.kv2lg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(db => {
    console.log("Se conecto a la base de datos")
}).catch(e => {
    console.log("No se pudo conectar a la base de datos");
});