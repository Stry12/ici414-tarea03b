const TipoProductoService = require('../Services/TipoProducto.js');

class TipoProductoController {
    static async crear(req, res) {
        try {
            const id = req.body.id;
            const descripcionProducto  = req.body.descripcion;
            const result = await TipoProductoService.crearTipoProducto(id, descripcionProducto);
            if (!result) {
                res.status(400).send('Tipo de producto ya existente');
            } else {
                res.status(201).send('Tipo de producto creado');
            }
        }
        catch (error) {
            res.status(500).send(error.message);
        }
    }

    static async updateDescripcion(req, res) {
        try {
            const id = req.params.id;
            const descripcionProducto  = req.body.descripcion;
            const result = await TipoProductoService.updateDescripcion(id, descripcionProducto);
            if (!result) {
                res.status(400).send('Tipo de producto no existente');
            } else {
                res.status(200).send('Descripción actualizada');
            }
        }
        catch (error) {
            res.status(500).send(error.message);
        }
    }

    static async updateID(req, res) {
        try {
            const id = req.params.id;
            const nuevoID = req.body.id;
            const result = await TipoProductoService.updateID(id, nuevoID);
            if (!result) {
                res.status(400).send('Tipo de producto no existente o ID inválido');
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
            const result = await TipoProductoService.delete(id);
            if (!result) {
                res.status(400).send('Tipo de producto no existente');
            } else {
                res.status(200).send('Tipo de producto eliminado');
            }
        }
        catch (error) {
            res.status(500).send(error.message);
        }
    }

}

module.exports = TipoProductoController;