var createError = require('http-errors');
var express = require('express');
var config = require('config');
var bodyParser = require('body-parser');
var tediousExpress = require('express4-tedious');

var app = express();
app.use(function (req, res, next) {
    req.sql = tediousExpress(config.get('connection'));
    next();
});

app.use(bodyParser.text());
app.use('/', require('./routes/stukdb'));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
   /* var err = new Error('Not Found: '+ req.method + ":" + req.originalUrl);
    err.status = 404;
    next(err);*/
    next(createError(404));
});
// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error/404');
});
app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function() {
    console.log('Express server listening on port ' + server.address().port);
});

module.exports = app;