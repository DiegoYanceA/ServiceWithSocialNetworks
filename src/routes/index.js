const express = require('express');
const router = express.Router();
const verifyToken = require("../controllers/verifyToken")

const authController = require('../controllers/authController');
const policyController = require('../controllers/policyController');

module.exports = function () {

    router.post('/signin', authController.signin);
    router.post('/signup', authController.signup);
    router.get('/me', verifyToken, authController.me);
    router.get('/privacy', policyController.policy);

    return router;
}