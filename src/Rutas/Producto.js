const ProductoController = require('../controller/Producto.js');
const express = require('express');
const router = express.Router();

router.post('/create', ProductoController.create); //lista
router.put('/updatePrecioCompra', ProductoController.updatePrecioCompra); //lista
router.delete('/deleteByComination', ProductoController.deleteByComination); //lista
router.delete('/deleteByidComprador', ProductoController.deleteByidComprador); 
router.delete('/deleteByidTipoProducto', ProductoController.deleteByidTipoProducto);
router.delete('/deleteBynumeroVendedor', ProductoController.deleteBynumeroVendedor);


module.exports = router;