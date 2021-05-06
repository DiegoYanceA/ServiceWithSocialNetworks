const axios = require("axios");
const queryString = require('querystring')
const API_KEY = process.env.API_KEY_YOUTUBE;
const Channel = require("../models/Channel");
const mode = process.env.MODE || "DEVELOPMENT";
const Rol = require("../models/Rol");

//Token
const myYoutubeChannel = "UCH5RD3yCZhuDf8V51rC1R7g";
const myNameTwitch = "asdiegoYA";
let TokenYoutube = "ya29.a0AfH6SMCz2uMhcuGhZS2btD32Oz0RdDcFXWPTYFNTJvjcLFeIpbyDjVteLrdiqXTbAKUw23w192Fq4IliBoxfK8xJyA3Rhyt3qGUVS7q2U62KS-chc8CX784jpSj7pvpsFpKAerPzHviw2tzFR7ZdDtIMJ_zl";

//Twitch
const TokenTwitch = process.env.TOKEN_TWITCH || "n5n7mmpzu7trb6774yovwmtgav858w";
const ClientID_TWITCH = process.env.CLIENTID_TWITCH || "3375bfutpo46g5nqrlvqzeibzf8aar";
const TwitchID = "565553685";

//DISCORD
let TokenDiscord = "ODMwMjQ1NDgzMTg3NTM1ODg0.YHD4XA.65FYZsLTYs6afhbjKyuFQPdlQAw";

//DISCORD
let TokenStreamlabs = "";
let TokenRefreshStreamlabs = ""

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
            'Client-ID': ClientID_TWITCH,
            'Authorization': 'OAuth ' + TokenTwitch,
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
    var url = "https://www.googleapis.com/youtube/v3/channels?id=" + idChannel + "&key=" + API_KEY + "&part=snippet,contentDetails,statistics,status";
    return url;
}

exports.anyYoutubeChannel = async (req, res, next) => {
    var { idChannel } = req.params;
    if (!idChannel) {
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
    var { _id } = await Rol.findOne({ name: "MOD" });
    var moderators = await Channel.find({ rol: _id });
    var channels = [];

    //Iteracion de canales
    for (var i = 0; i < moderators.length; i++) {
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
    var moderators = await Channel.find({ haveTexture: true });
    var channels = [];

    //Iteracion de canales
    for (var i = 0; i < moderators.length; i++) {
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
    if (mode == "PRODUCTION") {
        endpointToken = "https://asdiegoya.azurewebsites.net/api/v1/channels/myTokenYoutubeRefresh"
    } else {
        endpointToken = "http://localhost:3000/api/v1/channels/myTokenYoutubeRefresh"
    }

    var responseToken = await axios.post(endpointToken);

    TokenYoutube = responseToken.data.newToken.access_token

    var mySubscribers = []
    var endpoint = "https://youtube.googleapis.com/youtube/v3/subscriptions?part=snippet&maxResults=" + max + "&myRecentSubscribers=true&key=" + API_KEY
    try {
        var responseSuscribers = await axios.get(endpoint, {
            headers: {
                Authorization: 'Bearer ' + TokenYoutube,
                Accept: 'application/json'
            }
        });
        if (responseSuscribers.data != null) {
            for (var i = 0; i < responseSuscribers.data.items.length; i++) {
                var channelId = responseSuscribers.data.items[i].snippet.channelId
                var url = getUrlYoutube(channelId);
                var channel = await findYoutubeChannel(url);
                channel.urlChannel = "https://www.youtube.com/channel/" + channelId;
                mySubscribers.push(channel)
            }
        }
    } catch (e) {
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
        "code": '4/0AY0e-g6v_ChiamhoTEY0erpD3wjxwCUsBioeuq7Gk7UQ1_RrpmF9HcpJkQCFThK2slgLBQ',
        "redirect_uri": 'http://localhost:3000'
    }

    var endpoint = "https://accounts.google.com/o/oauth2/token";

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
        mySubscribers: response.data
    });
}

exports.myTokenYoutubeRefresh = async (req, res, next) => {
    var data = {
        "client_id": '760735499293-4eqlvjaivd9m4l5b9kouk0u2h1bi7j4t.apps.googleusercontent.com',
        "client_secret": 'hvBT7bvRK8IPAWKAh0v4NeB3',
        "grant_type": 'refresh_token',
        "refresh_token": '1//05J0U7YiIHtvVCgYIARAAGAUSNwF-L9IrO51tGJ-1in8Ejpcu7GeHKvIOm1SZnXlskCEmPIIyWMxbomF0npjGJjYVWQA-dcsr9b0'
    }

    var endpoint = "https://accounts.google.com/o/oauth2/token";

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

exports.myIdTwitch = async (req, res, next) => {
    var endpoint = "https://api.twitch.tv/helix/users";
    try {
        var response = await axios.get(endpoint, {
            headers: {
                'Client-Id': ClientID_TWITCH,
                'Authorization': 'Bearer ' + TokenTwitch
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
            'Client-ID': ClientID_TWITCH,
            'Authorization': 'Bearer ' + TokenTwitch
        },
    });
    var channelAux = {};
    if (response.data.data.length != 0) {
        for (var i = 0; i < response.data.data.length; i++) {
            if (response.data.data[i].display_name.localeCompare(name) == 0) {
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
    var endpoint = "https://api.twitch.tv/helix/users/follows?first=" + max + "&to_id=" + TwitchID;
    try {
        var response = await axios.get(endpoint, {
            headers: {
                'Client-Id': ClientID_TWITCH,
                'Authorization': 'Bearer ' + TokenTwitch
            },
        });
    } catch (e) {
        return res.json({
            twitch: e
        });
    }

    var channelTwitch = [];
    for (var i = 0; i < response.data.data.length; i++) {
        var name = response.data.data[i].from_name;
        var channel = await findTwitchChannel(name)
        channel.urlChannel = "http://twitch.tv/" + name;
        channelTwitch.push(channel);
    }

    return res.json({
        myFollowers: channelTwitch
    });
}


//DISCORD
/** 
 https://discord.com/api/oauth2/authorize?
    response_type=code&
    client_id=830245483187535884&
    scope=identify%20guilds.join&
    state=15773059ghq9183habn&
    redirect_uri=http://localhost:3000&
    prompt=consent
*/
exports.myTokenDiscord = async (req, res, next) => {
    var data = {
        client_id: '830245483187535884',
        client_secret: 'bBvMERERsH84wU7kh2hYXvw-knFO5yBm',
        grant_type: 'authorization_code',
        code: 'GIgphyltXPYxm3WoqXBJwAhWkOUqcO',
        redirect_uri: 'http://localhost:3000'
    }

    // var parametros = "client_id=" + data.client_id + "&client_secret=" + data.client_secret + "&grant_type=" + data.grant_type + "&code=" + data.code +  +"&redirect_uri=" + data.redirect_uri

    // var url ="https://discord.com/api/v8/oauth2/token?" + parametros;
    var endpoint = "https://discord.com/api/v8/oauth2/token";

    try {
        var response = await axios.post(endpoint, queryString.stringify(data), {
            headers: {
                "Content-Type": 'application/x-www-form-urlencoded'
            }
        });
    } catch (e) {
        console.log(e.response.data)
    }


    // console.log(res.data.headers['Content-Type'])

    return res.json({
        myToken: response.data
    });
}

exports.myTokenDiscordLogin = async (req, res, next) => {
    var data = {
        email: 'asdiegoya@gmail.com',
        password: 'asdasdsad'
    }

    var endpoint = "https://discordapp.com/api/auth/login";

    try {
        var response = await axios.post(endpoint, data, {
            headers: {
                "Content-Type": 'application/json'
            }
        });
    } catch (e) {
        console.log(e.response.data)
    }

    return res.json({
        myToken: response.data
    });
}

exports.myDiscordDetails = async (req, res, next) => {
    var idDiscord = "747586757888835655";
    var endpoint = "https://discord.com/api/v8/guilds/" + idDiscord + "?with_counts=true";
    // var endpoint ="https://discord.com/api/v8/users/@me/guilds";
    try {
        var response = await axios.get(endpoint, {
            headers: {
                "Authorization": 'Bot ' + TokenDiscord
            }
        });

        response.data.icon = "https://cdn.discordapp.com/icons/747586757888835655/107c46f02a57105a8b68cc5a4ede9177.png?size=256"
        return res.json({
            myDiscord: response.data
        });
    } catch (e) {

        return res.json({
            error: e
        });
    }

}

exports.myDiscord = async (req, res, next) => {
    var idDiscord = "747586757888835655";
    var endpoint = "https://discord.com/api/v8/guilds/" + idDiscord + "/preview";
    // var endpoint ="https://discord.com/api/v8/users/@me/guilds";
    try {
        var response = await axios.get(endpoint, {
            headers: {
                "Authorization": 'Bot ' + TokenDiscord
            }
        });
        return res.json({
            myDiscord: response.data
        });
    } catch (e) {

        return res.json({
            error: e
        });
    }

}

//Streamlabs

/*
    https://www.streamlabs.com/api/v1.0/authorize?
    client_id=RJrQkTE3IUfqLptkUV0kP0hEUDrLukHZ5cMMCSPS&
    redirect_uri=http://localhost:3000/api/v1/channels/myTokenStreamlabs&
    response_type=code&
    scope=donations.read+donations.create
*/
exports.myTokenStreamlabs = async (req, res, next) => {
    var code =  req.query.code;
    var redirect_uri = "";
    var client_id = ""
    var client_secret = "";
    if (mode == "PRODUCTION") {
        code = "ou0sQp2eM1OrB6x3pfzmgmYC3A27nuE4588m1hZn";
        redirect_uri = "https://asdiegoya.azurewebsites.net";
        client_id = "RJrQkTE3IUfqLptkUV0kP0hEUDrLukHZ5cMMCSPS";
        client_secret = "okLzRiNnECyIPzQfn37eXo1SB2zUtROCgzRfBJq3";
    } else {
        
        redirect_uri = "http://localhost:3000"
        client_id = "RJrQkTE3IUfqLptkUV0kP0hEUDrLukHZ5cMMCSPS";
        client_secret = "okLzRiNnECyIPzQfn37eXo1SB2zUtROCgzRfBJq3";
    }
   
    var data = {
        "grant_type": "authorization_code",
        "client_id": client_id,
        "client_secret": client_secret,
        "redirect_uri": redirect_uri + "/api/v1/channels/myTokenStreamlabs",
        "code": code
    }
    var endpoint = "https://streamlabs.com/api/v1.0/token";

    try {
        var response = await axios.post(endpoint, queryString.stringify(data), {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        });

        TokenStreamlabs = response.data.access_token;
        TokenRefreshStreamlabs = response.data.refresh_token;

        return res.json({
            tokenStreamlabs: response.data
        });
    } catch (e) {

        return res.json({
            error: e
        });
    }

}

exports.myTokenStreamlabsRefresh = async (req, res, next) => {
    var redirect_uri = "";
    if (mode == "PRODUCTION") {
        redirect_uri = "https://asdiegoya.azurewebsites.net";
        client_id = "RGuWKlWFjq9kZDUHkpFucIEt81ZrEC4gvSl7LkHe";
        client_secret = "oFXHtlRQbVRDnFOERvL2d2VYPPjfbg0gfPgPNtzv";
    } else {
        redirect_uri = "http://localhost:3000";
        client_id = "RJrQkTE3IUfqLptkUV0kP0hEUDrLukHZ5cMMCSPS";
        client_secret = "okLzRiNnECyIPzQfn37eXo1SB2zUtROCgzRfBJq3";
    }

    var data = {
        'client_id': client_id,
        'client_secret': client_secret,
        'grant_type': 'refresh_token',
        'redirect_uri': redirect_uri,
        'refresh_token': TokenRefreshStreamlabs
    }

    var endpoint = "https://www.twitchalerts.com/api/v1.0/token";

    try {
        var response = await axios.post(endpoint, queryString.stringify(data), {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        });
        TokenRefreshStreamlabs = response.data.refresh_token;
        return res.json({
            newToken: response.data
        });

    } catch (e) {

        return res.json({
            newToken: e
        });
    }

    
}

exports.myDonations = async (req, res, next) => {

    var endpointToken = "";
    if (mode == "PRODUCTION") {
        endpointToken = "https://asdiegoya.azurewebsites.net/api/v1/channels/myTokenStreamlabsRefresh"
    } else {
        endpointToken = "http://localhost:3000/api/v1/channels/myTokenStreamlabsRefresh"
    }
    
    var responseToken = await axios.post(endpointToken);
    TokenStreamlabs = responseToken.data.newToken.access_token;
    TokenRefreshStreamlabs = responseToken.data.newToken.refresh_token;
    
    var data = {
        "access_token": TokenStreamlabs,
        "limit": 10
    }

    var endpoint = "https://streamlabs.com/api/v1.0/donations?" + queryString.stringify(data);

    try {
        var response = await axios.get(endpoint);

        // var donators = response.data.data;
        // for(var i = 0; i < donators.length; i++){

        // }
        return res.json({
            myDonators: response.data.data
        });
    } catch (e) {
        // console.log(e.response.data)
        return res.json({
            myDonators: e.response.data
        });
    }
}


