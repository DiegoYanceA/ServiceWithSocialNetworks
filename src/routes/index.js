const express = require('express');
const router = express.Router();
const verifyToken = require("../controllers/verifyToken")

const authController = require('../controllers/authController');
const policyController = require('../controllers/policyController');
const streamerController = require('../controllers/streamerController');
const serverController = require('../controllers/serverController');
const userController = require('../controllers/userController');

module.exports = function () {

    router.post('/signin', authController.signin);
    router.post('/signup', authController.signup);
    router.get('/me', verifyToken, authController.me);
    router.get('/privacy', policyController.policy);

    //Youtube
    router.get('/channels/anyYoutube/:idChannel', streamerController.anyYoutubeChannel);
    router.get('/channels/modYoutube', streamerController.modYoutubeChannels);
    router.get('/channels/texturePack', streamerController.texturePackChannels);
    router.post('/channels/myTokenYoutube', streamerController.myTokenYoutube);
    router.post('/channels/myTokenYoutubeRefresh', streamerController.myTokenYoutubeRefresh);
    router.get('/channels/myChannels', streamerController.myChannels);
    router.get('/channels/mySubscribersYT/:max', streamerController.mySubscribersYT);
    router.post('/channels/myTokenYoutube', streamerController.myTokenYoutube);
    router.get('/channels/mySubsCountYT', streamerController.mySubsCountYT);

    //Twitch
    // router.get('/channels/myIdTwitch', streamerController.myIdTwitch);
    router.get('/channels/myFollowTwitch/:max', streamerController.myFollowTwitch);

    //Discord
    router.post('/channels/myTokenDiscord', streamerController.myTokenDiscord);

    //Server
    router.get('/servers/serverMinecraft/:ip', serverController.anyServerMinecraft);
    router.get('/servers/myServerMCRange', serverController.myServerMCRange);

    //User
    router.get('/users/getIp', userController.getIp);

    return router;
}