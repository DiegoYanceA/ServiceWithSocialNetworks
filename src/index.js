const { http } = require('./server');
require("./database")

const port = process.env.PORT || 3000;

http.listen(port, () => {
    console.log(`Server desplegado en el puerto ${port}!`);
});