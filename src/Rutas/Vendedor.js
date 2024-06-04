const express = require('express');
const router = express.Router();
const VendedorController = require('../controller/Vendedor.js');

router.post('/create', VendedorController.crearVendedor);
router.get('/getAll', VendedorController.getAll);
router.get('/getById/:id', VendedorController.getById);
router.put('/updateNombre/:id', VendedorController.updateNombre);
router.put('/updateID/:id', VendedorController.updateID);
router.delete('/delete/:id', VendedorController.delete);


module.exports = router;