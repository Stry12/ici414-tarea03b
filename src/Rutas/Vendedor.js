const express = require('express');
const router = express.Router();
const VendedorController = require('../controller/Vendedor.js');


router.get('/', VendedorController.getAll);


module.exports = router;