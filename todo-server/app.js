var express = require('express');
var mongoose = require('mongoose');
var config = require('./config/config');
var fs = require('fs');

//connect to mongodb
var connect = function() {
	mongoose.connect(config.db);
};

connect();
mongoose.connection.on('error', console.log);
mongoose.connection.on('disconnected', connect);

//require all models
var models_path = config.root + '/app/model';
fs.readdirSync(models_path).forEach(function(file) {
	require(models_path + '/' + file);
});

var app = express();

//require base setting
require('./config/setting')(app, config);

//handle all router of API
// require('./routes/router')(app, config);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
	app.use(function(err, req, res, next) {
		res.status(err.status || 500);
		res.render('error', {
			message: err.message,
			error: err
		});
	});
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
	res.status(err.status || 500);
	res.render('error', {
		message: err.message,
		error: {}
	});
});

module.exports = app;
