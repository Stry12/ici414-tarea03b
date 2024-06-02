const ProductoService = require('../Services/Producto');
const express = require('express');
const router = express.Router();

router.post('/create', ProductoService.create);
router.put('/updatePrecioCompra', ProductoService.updatePrecioCompra);
router.delete('/deleteByComination', ProductoService.deleteByComination);
router.delete('/deleteByidComprador', ProductoService.deleteByidComprador);
router.delete('/deleteByidTipoProducto', ProductoService.deleteByidTipoProducto);
router.delete('/deleteBynumeroVendedor', ProductoService.deleteBynumeroVendedor);


module.exports = router;