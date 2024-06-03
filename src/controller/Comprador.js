const CompradorService = require('../Transacciones/Comprador');

class CompradorController {
    static async getAll(req, res) {
        try {
            const compradores = await CompradorService.getAll();
            res.json(compradores);
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal server error');
        }
    }

    static async getById(req, res) {
        try {
            const comprador = await CompradorService.getById(req.params.id);
            
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal server error');
        }
    }

    static async create(req, res) {
        try {
            const { id,nombre } = req.body;
            const comprador = await CompradorService.crear(id,nombre);
            if (!comprador) {
                return res.status(400).send('Comprador already exists');
            }
            res.status(200).json({mensaje: 'Comprador creado correctamente'});
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal server error');
        }
    }

    static async updateNombre(req, res) {
        try {
            const comprador = await CompradorService.updateNombre(req.params.id, req.body.nombre);
            if (!comprador) {
                return res.status(404).send('Comprador not found');
            }
            res.status(200).json({mensaje: 'Comprador actualizado correctamente'});
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal server error');
        }
    }

    static async updateID(req, res) {
        try {
            const comprador = await CompradorService.updateID(req.params.id, req.body.id);
            if (!comprador) {
                return res.status(404).send('Comprador not found');
            }
            res.status(200).json({mensaje: 'id de comprador actualizada correctamente'});
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal server error');
        }
    }

    static async delete(req, res) {
        try {
            const comprador = await CompradorService.delete(req.params.id);
            if (comprador === false) {
                return res.status(404).send('Comprador not found');
            }
            return res.status(200).json({mensaje: 'Comprador eliminado correctamente'});
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal server error');
        }
    }
}

module.exports = CompradorController;
