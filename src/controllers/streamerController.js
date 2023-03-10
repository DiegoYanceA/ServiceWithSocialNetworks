const axios = require("axios");
const queryString = require('querystring')
const API_KEY = process.env.API_KEY_YOUTUBE;
const Channel = require("../models/Channel");
const mode = process.env.MODE || "DEVELOPMENT";
const Rol = require("../models/Rol");
const TokenModel = require("../models/Token");

//Token
const myYoutubeChannel = "UCH5RD3yCZhuDf8V51rC1R7g";
const myNameTwitch = "DiegoYance";
let TokenYoutube = "TOKEN_YOUTUBE";

//Twitch
const TokenTwitch = process.env.TOKEN_TWITCH || "TOKEN_TWITCH";
const ClientID_TWITCH = process.env.CLIENTID_TWITCH || "CLIENTE_ID_TWITCH";
const TwitchID = "565553685";

//DISCORD
let TokenDiscord = "TOKEN_DISCORD";

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
        if(!moderators[i].disabled){
            var url = getUrlYoutube(moderators[i].idChannel);
            
            var channel = await findYoutubeChannel(url);
            channel.urlChannel = "https://www.youtube.com/channel/" + moderators[i].idChannel;
            channels.push(channel)
        }
        
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
        endpointToken = "https://DiegoYance.azurewebsites.net/api/v1/channels/myTokenYoutubeRefresh"
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
  client_id=CLIENT_ID&
  redirect_uri=http%3A%2F%2Flocalhost%3A3000&
  scope=https://www.googleapis.com/auth/youtube&
  response_type=code&
  access_type=offline
 */

exports.myTokenYoutube = async (req, res, next) => {
    var data = {
        "client_id": 'client_id',
        "client_secret": 'client_secret',
        "grant_type": 'authorization_code',
        "code": 'code',
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
        "client_id": 'client_id',
        "client_secret": 'client_secret',
        "grant_type": 'refresh_token',
        "refresh_token": 'refresh_token'
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
        console.log(e);
        var refresh = "https://id.twitch.tv/oauth2/token/"
        var response = await axios.post(refresh, {
            "client_id": ClientID_TWITCH,
            "client_secret": "client_secret",
            "grant_type": "refresh_token",
            "refresh_token": a
        }, {
            headers: {
                'Client-Id': ClientID_TWITCH,
                'Authorization': 'Bearer ' + TokenTwitch,
            },
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
    client_id=client_id&
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
        email: 'mail',
        password: 'test'
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
    var idDiscord = "idDiscord";
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
    var idDiscord = "idDiscord";
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
    client_id=client_id&
    redirect_uri=http://localhost:3000&
    response_type=code&
    scope=donations.read+donations.create
*/
exports.myTokenStreamlabs = async (req, res, next) => {
    var code = req.query.code;
    var redirect_uri = "";
    var client_id = ""
    var client_secret = "";
    if (mode == "PRODUCTION") {
        redirect_uri = "https://DiegoYance.azurewebsites.net";
        client_id = "client_id";
        client_secret = "client_secrect";
    } else {
        redirect_uri = "http://localhost:3000"
        client_id = "client_id";
        client_secret = "client_secret";
    }

    var data = {
        "grant_type": "authorization_code",
        "client_id": client_id,
        "client_secret": client_secret,
        "redirect_uri": redirect_uri,
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

        var tokenID = "60ee14da1d9eff4ba802cb02";
        const tokenTemp = await TokenModel.findById(tokenID);

        tokenTemp.overwrite({
            token: TokenStreamlabs,
            tokenRefresh: TokenRefreshStreamlabs
        });

        await tokenTemp.save();

        return res.json({
            tokenStreamlabs: response.data,
            message: "Funciono papi diego"
        });
    } catch (e) {

        return res.json({
            error: e,
            message: "F"
        });
    }

}

exports.myTokenStreamlabsRefresh = async (req, res, next) => {
    var redirect_uri = "";
    if (mode == "PRODUCTION") {
        redirect_uri = "https://DiegoYance.azurewebsites.net";
        client_id = "client_id";
        client_secret = "client_secret";
    } else {
        redirect_uri = "http://localhost:3000";
        client_id = "client_id";
        client_secret = "client_secret";
    }

    if (TokenRefreshStreamlabs == '') {
        var tokenID = "60ee14da1d9eff4ba802cb02";
        const tokenTemp = await TokenModel.findById(tokenID);
        TokenRefreshStreamlabs = tokenTemp.tokenRefresh;
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
            newToken: response.data,
            message: "Funciono papi diego"
        });

    } catch (e) {

        return res.json({
            newToken: e,
            message: "F"
        });
    }


}

exports.myDonations = async (req, res, next) => {

    var endpointToken = "";
    if (mode == "PRODUCTION") {
        endpointToken = "https://DiegoYance.azurewebsites.net/api/v1/channels/myTokenStreamlabsRefresh"
    } else {
        endpointToken = "http://localhost:3000/api/v1/channels/myTokenStreamlabsRefresh"
    }

    var responseToken = await axios.post(endpointToken);
    TokenStreamlabs = responseToken.data.newToken.access_token;
    TokenRefreshStreamlabs = responseToken.data.newToken.refresh_token;

    var tokenID = "60ee14da1d9eff4ba802cb02";
    const tokenTemp = await TokenModel.findById(tokenID);

    tokenTemp.overwrite({
        token: TokenStreamlabs,
        tokenRefresh: TokenRefreshStreamlabs
    });

    await tokenTemp.save();

    var data = {
        "access_token": TokenStreamlabs,
        "limit": 100
    }

    var endpoint = "https://streamlabs.com/api/v1.0/donations?" + queryString.stringify(data);

    try {
        var response = await axios.get(endpoint);
        var donators = response.data.data;
        var accountant = [];
        for (var i = 0; i < donators.length; i++) {
            if (!accountant.includes(donators[i].email)) {
                accountant.push(donators[i].email)
            }
        }

        var arrayDonators = Array(accountant.length);
        for (var i = 0; i < donators.length; i++) {
            var index = accountant.indexOf(donators[i].email);
            if (-1 < index) {
                if (arrayDonators[index] == null) {
                    arrayDonators[index] = [];
                }
                arrayDonators[index].push(donators[i])
            }
        }

        return res.json({
            myDonators: arrayDonators
        });
    } catch (e) {
        // console.log(e.response.data)
        return res.json({
            myDonators: e.response.data
        });
    }
}


