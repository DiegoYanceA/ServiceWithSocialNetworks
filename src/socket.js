const axios = require("axios");
const { response } = require("express");

module.exports = (http) => {
    const io = require('socket.io')(http, {
        cors: {
          origin: '*',
          credentials: true,
          methods: ["GET", "POST"],
        }
      });

    io.on('connection', (socket) => {
        console.log('User connected.', socket.id);
        socket.on('customEmit', async (data) => {
            var response = await axios.get("http://localhost:3000/api/v1/channels/mySubsCountYT")
            var data = response.data
            io.emit('customEmit', data);
            
        });
    });
}