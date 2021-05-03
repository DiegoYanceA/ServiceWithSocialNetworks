const axios = require("axios");
const queryString = require('querystring')
const API_KEY = process.env.API_KEY_YOUTUBE;
const Channel = require("../models/Channel");
const Rol = require("../models/Rol");
const myYoutubeChannel = "UCH5RD3yCZhuDf8V51rC1R7g";
const myNameTwitch = "asdiegoYA";
const TokenTwitch = process.env.TOKEN_TWITCH || "n5n7mmpzu7trb6774yovwmtgav858w";
let tokenYoutube = "ya29.a0AfH6SMCz2uMhcuGhZS2btD32Oz0RdDcFXWPTYFNTJvjcLFeIpbyDjVteLrdiqXTbAKUw23w192Fq4IliBoxfK8xJyA3Rhyt3qGUVS7q2U62KS-chc8CX784jpSj7pvpsFpKAerPzHviw2tzFR7ZdDtIMJ_zl";
const mode = process.env.MODE || "DEVELOPMENT";

const ClientID = process.env.CLIENTID_TWITCH || "3375bfutpo46g5nqrlvqzeibzf8aar";
const TwitchID = "565553685"; 

//API YOUTUBE
//Encuentra un canal de Youtube con sus datos mediante su ID
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

//Encuentra un canal de Twitch con sus datos mediante su nombre
findMyTwitchChannel = async (name) => {
    var url = "https://api.twitch.tv/kraken/channel?channel_read=" + name;
    var response = await axios.get(url, {
        headers: {
            'Client-ID' : ClientID,
            'Authorization' : 'OAuth ' + TokenTwitch,
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
    var url = "https://www.googleapis.com/youtube/v3/channels?id="+ idChannel +"&key=" + API_KEY + "&part=snippet,contentDetails,statistics,status";
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

exports.texturePackChannels = async (req, res) => {
    var moderators = await Channel.find({haveTexture: true});
    var channels = [];

    //Iteracion de canales
    for(var i = 0; i < moderators.length; i++){
        var url = getUrlYoutube(moderators[i].idChannel);
        var channel = await findYoutubeChannel(url);
        channel.urlChannel = "https://www.youtube.com/channel/" + moderators[i].idChannel;
        channels.push(channel)
    }
    
    return res.json({
        texturePack: channels
    });
}

exports.myChannels = async (req, res, next) => {
    
    var channelYoutube = await findYoutubeChannel(getUrlYoutube(myYoutubeChannel));
    var channelTwitch = await findMyTwitchChannel(myNameTwitch)
    
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

exports.mySubsCountYT = async (req, res, next) => {
    // res.header('Access-Control-Allow-Origin', '*');
    
    var channelYoutube = await findYoutubeChannel(getUrlYoutube(myYoutubeChannel));
    var subsCount = channelYoutube.statistics.subscriberCount;
    return res.json({
        subsCount: subsCount
    });
}

exports.myFollowsCountYT = async (req, res, next) => {
    // res.header('Access-Control-Allow-Origin', '*');

    var channelYoutube = await findYoutubeChannel(getUrlYoutube(myYoutubeChannel));
    var subsCount = channelYoutube.statistics.subscriberCount;
    return res.json({
        subsCount: subsCount
    });
}

exports.mySubscribersYT = async (req, res, next) => {
    var { max } = req.params;
    var endpointToken = "";
    if(mode == "PRODUCTION"){
        endpointToken = "https://asdiegoya.azurewebsites.net/api/v1/channels/myTokenYoutubeRefresh"
    } else {
        endpointToken = "http://localhost:3000/api/v1/channels/myTokenYoutubeRefresh"
    }
    
    var responseToken = await axios.post(endpointToken);
    
    tokenYoutube = responseToken.data.newToken.access_token

    var mySubscribers = []
    var endpoint = "https://youtube.googleapis.com/youtube/v3/subscriptions?part=snippet&maxResults=" + max + "&myRecentSubscribers=true&key=" + API_KEY
    try {
        var responseSuscribers = await axios.get(endpoint, {
            headers: {
                Authorization: 'Bearer ' + tokenYoutube,
                Accept: 'application/json'
            }
        });
        if(responseSuscribers.data != null){
            for(var i = 0; i < responseSuscribers.data.items.length ; i++){
                var channelId = responseSuscribers.data.items[i].snippet.channelId
                var url = getUrlYoutube(channelId);
                var channel = await findYoutubeChannel(url);
                channel.urlChannel = "https://www.youtube.com/channel/" + channelId;
                mySubscribers.push(channel)
            }
        }
    } catch(e){
        return res.json({
            data: e.responseSuscribers.data
        });
    }

    return res.json({
        mySubscribers: mySubscribers
    });
}

/**
 * 
https://accounts.google.com/o/oauth2/auth?
  client_id=760735499293-4eqlvjaivd9m4l5b9kouk0u2h1bi7j4t.apps.googleusercontent.com&
  redirect_uri=http%3A%2F%2Flocalhost%3A3000&
  scope=https://www.googleapis.com/auth/youtube&
  response_type=code&
  access_type=offline
 */

exports.myTokenYoutube = async (req, res, next) => {
    var data = {
        "client_id": '760735499293-4eqlvjaivd9m4l5b9kouk0u2h1bi7j4t.apps.googleusercontent.com',
        "client_secret": 'hvBT7bvRK8IPAWKAh0v4NeB3',
        "grant_type": 'authorization_code',
        "code":'4/0AY0e-g6v_ChiamhoTEY0erpD3wjxwCUsBioeuq7Gk7UQ1_RrpmF9HcpJkQCFThK2slgLBQ',
        "redirect_uri": 'http://localhost:3000'
    }

    var endpoint ="https://accounts.google.com/o/oauth2/token";

    try {
        var response = await axios.post(endpoint, queryString.stringify(data), {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Host": "accounts.google.com"
            }
        });

    } catch (e) {
        console.log(e.response.data)
    }

    // try{
        
    // } catch(e) {
    //     console.log(e)
    // }
    return res.json({
        mySubscribers: response.data
    });
}

exports.myTokenYoutubeRefresh = async (req, res, next) => {
    var data = {
        "client_id": '760735499293-4eqlvjaivd9m4l5b9kouk0u2h1bi7j4t.apps.googleusercontent.com',
        "client_secret": 'hvBT7bvRK8IPAWKAh0v4NeB3',
        "grant_type": 'refresh_token',
        "refresh_token":'1//05J0U7YiIHtvVCgYIARAAGAUSNwF-L9IrO51tGJ-1in8Ejpcu7GeHKvIOm1SZnXlskCEmPIIyWMxbomF0npjGJjYVWQA-dcsr9b0'
    }

    var endpoint ="https://accounts.google.com/o/oauth2/token";

    try {
        var response = await axios.post(endpoint, queryString.stringify(data), {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Host": "accounts.google.com"
            }
        });
    } catch (e) {
        console.log(e.response.data)
    }

    return res.json({
        newToken: response.data
    });
}

exports.myTokenDiscord = async (req, res, next) => {
    var data = {
        client_id: '830245483187535884',
        client_secret: 'bBvMERERsH84wU7kh2hYXvw-knFO5yBm',
        grant_type: 'authorization_code',
        code:'d561SKFs7UMcCAoKRJOHFk4oPkaelM',
        redirect_uri: 'http://localhost:3000'
    }

    var parametros = "client_id=" + data.client_id + "&client_secret=" + data.client_secret + "&grant_type=" + data.grant_type + "&code=" + data.code +  +"&redirect_uri=" + data.redirect_uri

    var url ="https://discord.com/api/v8/oauth2/token?" + parametros;
    // var url ="https://discord.com/api/v8/oauth2/token";
    
    try {
        var response = await axios.post(url , {} ,{
            headers: {
                "Content-Type": 'application/x-www-form-urlencoded'
            }
        });
    } catch (e) {
        console.log(e)
    }
    
    
    // console.log(res.data.headers['Content-Type'])

    return res.json({
        discord: response.data
    });
}

exports.myIdTwitch = async (req, res, next) => {
    var endpoint = "https://api.twitch.tv/helix/users";
    try {
        var response = await axios.get(endpoint, {
            headers: {
                'Client-Id' : ClientID,
                'Authorization' : 'Bearer ' + TokenTwitch
            },
        });
    } catch (e) {
        return res.json({
            twitch: e
        });
    }
    

    return res.json({
        twitch: response.data
    });
}

findTwitchChannel = async (name) => {
    var url = "https://api.twitch.tv/helix/search/channels?query=" + name;
    var response = await axios.get(url, {
        headers: {
            'Client-ID' : ClientID,
            'Authorization' : 'Bearer ' + TokenTwitch
        },
    });
    var channelAux = {};
    if(response.data.data.length != 0) {
        for(var i = 0; i < response.data.data.length; i++){
            if(response.data.data[i].display_name.localeCompare(name) == 0){
                channelAux = response.data.data[i];
                break;
            }
        }
    }
    
    var channel = {
        channelName: name,
        channelPhoto: channelAux.thumbnail_url,
        isLive: channelAux.is_live
    }

    
    return channel;
}

exports.myFollowTwitch = async (req, res, next) => {
    var { max } = req.params;
    var endpoint = "https://api.twitch.tv/helix/users/follows?first=" + max +"&to_id=" + TwitchID;
    try {
        var response = await axios.get(endpoint, {
            headers: {
                'Client-Id' : ClientID,
                'Authorization' : 'Bearer ' + TokenTwitch
            },
        });
    } catch (e) {
        return res.json({
            twitch: e
        });
    }

    var channelTwitch = [];
    for(var i = 0; i < response.data.data.length; i++){
        var name = response.data.data[i].from_name;
        var channel = await findTwitchChannel(name)
        channel.urlChannel = "http://twitch.tv/" + name;
        channelTwitch.push(channel);
    }

    return res.json({
        myFollowers: channelTwitch
    });
}
