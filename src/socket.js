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
  var emoji = "https://i.ibb.co/1dymzj4/GG.png";
  var background = "https://i.pinimg.com/474x/d4/4d/66/d44d6618bd550a899c722a0a7b28b2b6.jpg";
  var enableMessage = true;
  var enableEmoji = true;
  var arrayEmojis = [];
  var arrayBackground = [];
  var url = "";

  var maxlenghtInput = 80;

  const mode = process.env.MODE || "DEVELOPMENT";
  if (mode == "PRODUCTION") {
    url = "https://DiegoYance.azurewebsites.net";
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
      var responseEmojis = await axios.get(url + "/api/v1/emojis/getall")
      arrayEmojisTemp = responseEmojis.data;
      for(var i = 0; i < arrayEmojisTemp.emojis.length; i++){
        if(arrayEmojisTemp.emojis[i].image.localeCompare(data) == 0){
          socket.broadcast.emit('emojiChangeServer', data);
          emoji = data;
          return;
        }
      }
      
    });

    //Cambiar de Background
    socket.on('backgroundChangeClient', async (data) => {
      var responseBackground = await axios.get(url + "/api/v1/backgrounds/getall")
      arrayBackgroundTemp = responseBackground.data;
      for(var i = 0; i < arrayBackgroundTemp.backgrounds.length; i++){
        if(arrayBackgroundTemp.backgrounds[i].image.localeCompare(data) == 0){
          socket.broadcast.emit('backgroundChangeServer', data);
          background = data;
          return;
        }
      }
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