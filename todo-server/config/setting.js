var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var favicon = require('serve-favicon');

module.exports = function(app, config) {
	//view engine setup
	app.set('views', path.join(__dirname, 'views'));
	app.set('view engine', 'ejs');

	//uncomment after placing your favicon in /public
	app.use(favicon(config.root + '/public/favicon.ico'));
	app.use(logger('dev'));
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({
		extended: true
	}));
	app.use(cookieParser());
	app.use(require('express-session')({
		secret: 'font-end-todoapp',
		resave: false,
		saveUninitialized: false
	}));
	app.use(express.static(config.root + '/public'));

	////handle all router of API
	require('../routes/router')(app, config);
};
