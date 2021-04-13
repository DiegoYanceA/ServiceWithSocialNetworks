const axios = require("axios");

exports.getIp = async (req, res) => {
    console.log("gaaa")
    var url = "https://api.ipify.org/?format=json";
    var response = await axios.get(url);
    console.log(response)
    return res.json({
        servers: response.data
    });
}