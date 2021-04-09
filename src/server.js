const express = require('express');
const path = require('path');
const router = require('./routes/index.js');
const history = require('connect-history-api-fallback');
const cors = require('cors');
const mode = process.env.MODE || "DEVELOPMENT";

// ignore request for FavIcon. so there is no error in browser
const ignoreFavicon = (req, res, next) => {
    if (req.originalUrl.includes('favicon.ico')) {
        res.status(204).end();
    }
    next();
};

// fn to create express server
const create = async () => {

    // server
    const app = express();

    // configure nonFeature
    app.use(ignoreFavicon);
    
    //json
    app.use(express.json());
    app.use(express.urlencoded({extended: true}))
    
    // app.use(express.static(__dirname + '/../public/'));

    if(mode != "DEVELOPMENT"){
        app.use(history());
    }
    
    
    app.use(cors());

    // root route - serve static file
    app.get('/', (req, res) => {
        // res.send('<h2>Bienvenido: Ingresaste al Servidor</h2>');

        // res.render('index.html');
    });

    app.use('/', router());

    // Error handler
    /* eslint-disable no-unused-vars */
    app.use((err, req, res, next) => {
        console.error(err.stack);
        res.status(500).send('Something broke!');
    });
    return app;
};

module.exports = {
    create
};
