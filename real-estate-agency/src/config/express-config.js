const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');

function expressConfig(app){
    app.use('/static', express.static(path.resolve(__dirname, '../public')));
    app.use(express.urlencoded({extended: true}));
    app.use(cookieParser());
}

module.exports = expressConfig;