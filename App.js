const express = require('express');
const values = require('./src/constantes/const.js');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const conexionDB = require('./src/ConexionDB/conexion.js');



const App = express();

// Configuración
App.set('env', process.env.NODE_ENV || 'development');
App.set('port', process.env.PORT || values.PORT || 8080);
App.set('views', __dirname + '/src/views');
App.set('view engine', 'ejs');
App.use(bodyParser.urlencoded({ extended: true }));
App.use(bodyParser.json());

// Middleware
App.use(express.json({ limit: '500MB' }));
App.use(express.urlencoded({ extended: true }));
App.use(morgan('dev'));


// Manejo de errores
App.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

// Rutas
App.use('/vendedor', require('./src/Rutas/Vendedor.js'));
App.use('/comprador', require('./src/Rutas/Comprador.js'));
App.use('/tipoProducto', require('./src/Rutas/TipoProducto.js'));
App.use('/producto', require('./src/Rutas/Producto.js'));

module.exports = App; // Exportar la aplicación para usarla en index.js
