//Importar paquetes con middlewares
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var partials = require('express-partials');

//Importar enrutadores
var routes = require('./routes/index');

//Crear aplicación
var app = express();

// Instalar generador de vistas ejs
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(partials());

//Instalar middlewares
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Instalar enrutadores asociando rutas a sus gestores
app.use('/', routes);


//Gestión de errores

//Error para una ruta no definida
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// Gestión de errores en desarrollo
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err,
            errors: []
        });
    });
}

// Gestión de errores en producción
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {},
        errors: []
    });
});


//Exportar app para módulo de arranque
module.exports = app;
