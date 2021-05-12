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
  var emoji = "https://static-cdn.jtvnw.net/emoticons/v2/307595784/default/light/1.0";
  var enableMessage = true;
  var enableEmoji = true;

  io.on('connection', (socket) => {
    // console.log('User connected.', socket.id, messageAux);
    // socket.join('yt room');
    // socket.broadcast.emit("messageRandom", "world");
    socket.emit('changeMessageRandom', messageAux);
    socket.emit('emojiChangeServer', emoji);
    socket.emit('changeMessageEnable', enableMessage);
    socket.emit('changeEmojiEnable', enableEmoji);

    //Cambiar de mensaje
    socket.on('messageRandom', async (message) => {
      // var response = await axios.get("http://localhost:3000/api/v1/channels/mySubsCountYT")
      // var data = response.data
      if(51 < message.length){
        message = message.substring(0, 51);
      }
      socket.broadcast.emit('changeMessageRandom', message);
      messageAux = message;
      // io.to('yt room').emit('messageRandom');
    });

    //Cambiar de emoji
    socket.on('emojiChangeClient', async (data) => {
      socket.broadcast.emit('emojiChangeServer', data);
      emoji = data;
    });

    //Habilitar los mensajes ramdon
    socket.on('changeMessageServer', async (data) => {
      socket.broadcast.emit('changeMessageEnable', data);
      enableMessage = data;
    });

    //Habilitar los emojis
    socket.on('changeEmojiServer', async (data) => {
      socket.broadcast.emit('changeEmojiEnable', data);
      enableEmoji = data;
    });
    
  });
}