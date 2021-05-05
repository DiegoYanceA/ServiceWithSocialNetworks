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
    var messageAux = "";
    io.on('connection', (socket) => {
        console.log('User connected.', socket.id, messageAux);
        // socket.join('yt room');
        // socket.broadcast.emit("messageRandom", "world");
        socket.emit('changeMessageRandom', messageAux);
        socket.on('messageRandom', async (message) => {
            // var response = await axios.get("http://localhost:3000/api/v1/channels/mySubsCountYT")
            // var data = response.data
            socket.broadcast.emit('changeMessageRandom', message);
            messageAux = message;
            // io.to('yt room').emit('messageRandom');
        });
    });
}