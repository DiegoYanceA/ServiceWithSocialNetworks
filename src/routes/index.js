const express = require('express');
const router = express.Router();
const verifyToken = require("../controllers/verifyToken")

const authController = require('../controllers/authController');
const policyController = require('../controllers/policyController');
const youtubeController = require('../controllers/youtubeController');

module.exports = function () {

    router.post('/signin', authController.signin);
    router.post('/signup', authController.signup);
    router.get('/me', verifyToken, authController.me);
    router.get('/privacy', policyController.policy);
    router.get('/channel', youtubeController.channel);

    return router;
}