const VendedorService = require('../Transacciones/Vendedor.js');

class VendedorController {

    static async crearVendedor(req, res) {
        try {
            const { id, nombre } = req.body;
            const result = await VendedorService.crearVendedor(id, nombre);
            if (!result) {
                res.status(400).send('Vendedor ya existente o nombre inválido');
            } else {
                res.status(201).send('Vendedor creado');
            }
            
        }
        catch (error) {
            res.status(500).send(error.message);
        }
    }
    
    static async updateNombre(req, res) {
        try {
            const id = req.params.id;
            const { nombre } = req.body;

            const result = await VendedorService.updateNombre(id, nombre);
            if (!result) {
                res.status(400).send('Vendedor no existente o nombre inválido');
            } else {
                res.status(200).send('Nombre actualizado');
            }
        }
        catch (error) {
            res.status(500).send(error.message);
        }
    }

    static async updateID(req, res) {
        try {
            const id = req.params.id;
            const nuevoID  = req.body.id;
            const result = await VendedorService.updateID(id, nuevoID);
            if (!result) {
                res.status(400).send('Vendedor no existente o ID inválido');
            } else {
                res.status(200).send('ID actualizado');
            }
        }
        catch (error) {
            res.status(500).send(error.message);
        }
    }

    static async delete(req, res) {
        try {
            const id = req.params.id;
            const result = await VendedorService.delete(id);
            if (!result) {
                res.status(400).send('Vendedor no existente');
            } else {
                res.status(200).send('Vendedor eliminado');
            }
        }
        catch (error) {
            res.status(500).send(error.message);
        }
    }
}

module.exports = VendedorController;