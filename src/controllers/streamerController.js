const axios = require("axios");
const API_KEY = process.env.API_KEY_YOUTUBE;
const Channel = require("../models/Channel");
const Rol = require("../models/Rol");
const myYoutubeChannel = "UCH5RD3yCZhuDf8V51rC1R7g";
const myNameTwitch = "asdiegoYA";
const tokenTwitch = process.env.TOKEN_TWITCH || "n5n7mmpzu7trb6774yovwmtgav858w";

//API YOUTUBE
findYoutubeChannel = async (url) => {

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

findTwitchChannel = async (name) => {
    var url = "https://api.twitch.tv/kraken/channel?channel_read=" + name;
    var response = await axios.get(url, {
        headers: {
            'Client-ID' : '3375bfutpo46g5nqrlvqzeibzf8aar',
            'Authorization' : 'OAuth ' + tokenTwitch,
            'Accept': 'application/vnd.twitchtv.v5+json'
        },
    });
    var channel = {
        followers: response.data.followers,
        channelName: response.data.name,
        channelPhoto: response.data.logo
    }
    return channel;
}

getUrlYoutube = (idChannel) => {
    var url = "https://www.googleapis.com/youtube/v3/channels?id= "+ idChannel +"&key=" + API_KEY + "&part=snippet,contentDetails,statistics,status";
    return url;
}

exports.anyYoutubeChannel =  async (req, res, next) => {
    var { idChannel } = req.params;
    if(!idChannel){
        return res.json({
            msg: "El sistema no ha recibido la ID del canal."
        });
    }

    var url = getUrlYoutube(idChannel);

    var channel = await findYoutubeChannel(url);

    return res.json({
        channel: channel
    });

};

exports.modYoutubeChannels = async (req, res) => {
    var { _id } = await Rol.findOne({name: "MOD"});
    var moderators = await Channel.find({rol: _id});
    var channels = [];

    //Iteracion de canales
    for(var i = 0; i < moderators.length; i++){
        var url = getUrlYoutube(moderators[i].idChannel);
        var channel = await findYoutubeChannel(url);
        channel.urlChannel = "https://www.youtube.com/channel/" + moderators[i].idChannel;
        channels.push(channel)
    }
    
    return res.json({
        moderators: channels
    });
}

exports.myChannels = async (req, res, nexxt) => {
    
    var channelYoutube = await findYoutubeChannel(getUrlYoutube(myYoutubeChannel));
    var channelTwitch = await findTwitchChannel(myNameTwitch)

    var myChannel = {
        names: {
            twitch: channelTwitch.channelName,
            youtube: channelYoutube.channelName
        },
        subs: {
            twitch: channelTwitch.followers,
            youtube: channelYoutube.statistics.subscriberCount
        },
        photo: {
            twitch: channelTwitch.channelPhoto,
            youtube: channelYoutube.channelPhoto
        }
    }

    return res.json({
        myChannel: myChannel
    });
}