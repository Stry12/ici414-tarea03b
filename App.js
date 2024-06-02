const express = require('express');
const values = require('./src/constantes/const.js');
const morgan = require('morgan');
const conexionDB = require('./src/ConexionDB/conexion.js');



const App = express();

// Configuración
App.set('env', process.env.NODE_ENV || 'development');
App.set('port', process.env.PORT || values.PORT || 8080);

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

module.exports = App; // Exportar la aplicación para usarla en index.js
