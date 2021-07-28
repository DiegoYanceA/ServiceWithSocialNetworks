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
  var background = "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/6169b41c-74fe-4235-9815-1e8d4dc87406/d3hgxl4-a6d413df-c24f-4077-b1d2-8765659ef170.png/v1/fill/w_900,h_800,strp/png_fondo_blanco_by_camilhitha124_d3hgxl4-fullview.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9ODAwIiwicGF0aCI6IlwvZlwvNjE2OWI0MWMtNzRmZS00MjM1LTk4MTUtMWU4ZDRkYzg3NDA2XC9kM2hneGw0LWE2ZDQxM2RmLWMyNGYtNDA3Ny1iMWQyLTg3NjU2NTllZjE3MC5wbmciLCJ3aWR0aCI6Ijw9OTAwIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.cqTa97iqaSe0PxJFnP1-_DyuUqhlBsPnj9Yy5b3abZg";
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