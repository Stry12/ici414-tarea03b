const express = require('express');
const router = express.Router();
const CompradorController = require('../controller/Comprador');

router.post('/create', CompradorController.create);
router.delete('/delete/:id', CompradorController.delete);
router.put('/updateNombre/:id', CompradorController.updateNombre2);
router.put('/updateID/:id', CompradorController.updateID);


module.exports = router;