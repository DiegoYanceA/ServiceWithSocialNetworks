const axios = require("axios");
const Server = require("../models/Server");

//API SERVER MINECRAFT
findServerMC = async (ip) => {   
    var url = "https://api.mcsrvstat.us/2/" + ip;
    var response = await axios.get(url);
    
    return response.data;
}

exports.anyServerMinecraft = async (req, res) => {
    var { ip } = req.params;
    var data = await findServerMC(ip)
    data.hostname = ip;
    return res.json({
        servers: data
    });
}


exports.myServerMCRange = async (req, res) => {
    const serversApi = await Server.find();
    var servers = [];
    for(var i = 0; i < serversApi.length; i++){
        var server = await findServerMC(serversApi[i].ip)
        server.nameServer = serversApi[i].nameServer;
        server.hostname = serversApi[i].ip;
        servers.push(server);
    }

    return res.json({
        servers: servers
    });
}