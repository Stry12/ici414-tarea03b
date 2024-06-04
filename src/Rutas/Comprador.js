const express = require('express');
const router = express.Router();
const CompradorController = require('../controller/Comprador');

router.post('/create', CompradorController.create);
router.get('/getAll', CompradorController.getAll);
router.get('/getById/:id', CompradorController.getById);
router.delete('/delete/:id', CompradorController.delete);
router.put('/updateNombre/:id', CompradorController.updateNombre);
router.put('/updateID/:id', CompradorController.updateID);


module.exports = router;