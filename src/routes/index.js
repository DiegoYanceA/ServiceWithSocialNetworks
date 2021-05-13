const express = require('express');
const router = express.Router();
const verifyToken = require("../controllers/verifyToken")

const authController = require('../controllers/authController');
const policyController = require('../controllers/policyController');
const streamerController = require('../controllers/streamerController');
const serverController = require('../controllers/serverController');
const userController = require('../controllers/userController');
const emojiController = require('../controllers/emojiController');

module.exports = function () {

    router.post('/auth/signin', authController.signin);
    router.post('/auth/signup', authController.signup);
    // router.post('/auth/signout', verifyToken, authController.signout);
    router.get('/auth/existUser', verifyToken, authController.existUser);
    // router.get('/privacy', policyController.policy);

    //Youtube
    router.get('/channels/anyYoutube/:idChannel', streamerController.anyYoutubeChannel);
    router.get('/channels/modYoutube', streamerController.modYoutubeChannels);
    router.get('/channels/texturePack', streamerController.texturePackChannels);
    router.post('/channels/myTokenYoutube', streamerController.myTokenYoutube);
    router.post('/channels/myTokenYoutubeRefresh', streamerController.myTokenYoutubeRefresh);
    router.get('/channels/myChannels', streamerController.myChannels);
    router.get('/channels/mySubscribersYT/:max', streamerController.mySubscribersYT);
    router.post('/channels/myTokenYoutube', streamerController.myTokenYoutube);
    // router.get('/channels/mySubsCountYT', streamerController.mySubsCountYT);

    //Twitch
    // router.get('/channels/myIdTwitch', streamerController.myIdTwitch);
    router.get('/channels/myFollowTwitch/:max', streamerController.myFollowTwitch);

    //Discord
    router.post('/channels/myTokenDiscord', streamerController.myTokenDiscord);
    // router.post('/channels/myTokenDiscordLogin', streamerController.myTokenDiscordLogin);
    router.get('/channels/myDiscord', streamerController.myDiscord);
    router.get('/channels/myDiscordDetails', streamerController.myDiscordDetails);

    //Streamlabs
    router.get('/channels/myTokenStreamlabs', streamerController.myTokenStreamlabs);
    router.post('/channels/myTokenStreamlabsRefresh', streamerController.myTokenStreamlabsRefresh);
    router.get('/channels/myDonations', streamerController.myDonations);
    
    //Server
    router.get('/servers/serverMinecraft/:ip', serverController.anyServerMinecraft);
    router.get('/servers/myServerMCRange', serverController.myServerMCRange);

    //User
    router.get('/users/getIp', userController.getIp);

    //Emojis
    // router.get('/emojis/getAll', verifyToken, emojiController.getAllEmojis);
    router.get('/emojis/getAll', emojiController.getAllEmojis);
    router.post('/emojis/create', verifyToken, emojiController.createEmoji);
    router.delete('/emojis/delete/:id', verifyToken, emojiController.deleteEmoji);
    return router;
}