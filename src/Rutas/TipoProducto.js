const express = require('express');
const router = express.Router();
const TipoProductoController = require('../controller/TipoProducto.js');

router.post('/create', TipoProductoController.crear);
router.put('/updateDescripcion/:id', TipoProductoController.updateDescripcion);
router.put('/updateID/:id', TipoProductoController.updateID);
router.delete('/delete/:id', TipoProductoController.delete);

module.exports = router;