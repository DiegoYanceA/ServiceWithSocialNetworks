const axios = require("axios");
const API_KEY = process.env.API_KEY_YOUTUBE;
const Channel = require("../models/Channel");
const User = require("../models/User");
const Rol = require("../models/Rol");
const myChannel = "UCH5RD3yCZhuDf8V51rC1R7g";

findChannel = async (url) => {
    var response = await axios.get(url);
    var data = response.data.items[0];
    var channelName = data.snippet.title;
    var channelPhoto = data.snippet.thumbnails;
    var statistics = data.statistics;

    var channel = {
        statistics: statistics,
        channelName: channelName,
        channelPhoto: channelPhoto
    }
    return channel;
}

getUrlYoutube = (idChannel) => {
    var url = "https://www.googleapis.com/youtube/v3/channels?id= "+ idChannel +"&key=" + API_KEY + "&part=snippet,contentDetails,statistics,status";
    return url;
}

exports.anyChannel =  async (req, res, next) => {
    var { idChannel } = req.params;
    if(!idChannel){
        return res.json({
            msg: "El sistema no ha recibido la ID del canal."
        });
    }

    var url = getUrlYoutube(idChannel);

    var channel = await findChannel(url);

    return res.json({
        channel: channel
    });

};

exports.modChannels = async (req, res) => {
    var { _id } = await Rol.findOne({name: "MOD"});
    var moderators = await Channel.find({rol: _id});
    var channels = [];

    //Iteracion de canales
    for(var i = 0; i < moderators.length; i++){
        var url = getUrlYoutube(moderators[i].idChannel);
        var channel = await findChannel(url);
        channel.urlChannel = "https://www.youtube.com/channel/" + moderators[i].idChannel;
        channels.push(channel)
    }
    
    return res.json({
        moderators: channels
    });
}