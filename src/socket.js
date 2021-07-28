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
  var background = "https://yoguidrogui.com/wp-content/uploads/2020/01/guia-setup-gaming-gamer-750x375.jpg";
  var enableMessage = true;
  var enableEmoji = true;
  var arrayEmojis = [];
  var arrayBackground = [];
  var url = "";

  var maxlenghtInput = 80;

  const mode = process.env.MODE || "DEVELOPMENT";
  if (mode == "PRODUCTION") {
    url = "https://asdiegoya.azurewebsites.net";
  } else {
    url = "http://localhost:3000"
  }

  io.on('connection', async (socket) => {
    var responseEmojis = await axios.get(url + "/api/v1/emojis/getall")
    arrayEmojis = responseEmojis.data;

    var responseBackground = await axios.get(url + "/api/v1/backgrounds/getall")
    arrayBackground = responseBackground.data;

    // console.log('User connected.', socket.id, messageAux);
    // socket.join('yt room');
    // socket.broadcast.emit("messageRandom", "world");
    socket.emit('changeMessageRandom', messageAux);
    socket.emit('emojiChangeServer', emoji);
    socket.emit('backgroundChangeServer', background);
    socket.emit('changeMessageEnable', enableMessage);
    socket.emit('changeEmojiEnable', enableEmoji);
    socket.emit('changeArrayEmojisSever', arrayEmojis.emojis);

    //Cambiar de mensaje
    socket.on('messageRandom', async (message) => {

      if (maxlenghtInput + 1 < message.length) {
        message = message.substring(0, maxlenghtInput + 1);
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

    //Cambiar de Background
    socket.on('backgroundChangeClient', async (data) => {
      socket.broadcast.emit('backgroundChangeServer', data);
      background = data;
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

    //Array de emojis
    socket.on('changeArrayEmojisClient', async (data) => {
      socket.broadcast.emit('changeArrayEmojisServer', data);
      arrayEmojis = data;
    });

    //Array de backgrounds
    socket.on('changeArrayBackgroundsClient', async (data) => {
      socket.broadcast.emit('changeArrayBackgroundsServer', data);
      arrayBackgrounds = data;
    });

  });
}