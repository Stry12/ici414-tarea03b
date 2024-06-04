const VendedorService = require('../Transacciones/Vendedor.js');

class VendedorController {

    static async crearVendedor(req, res) {
    try {
        console.log(req.body); // Imprime los datos que se envían desde el formulario

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

    static async getAll(req, res) {
        try {
            const vendedores = await VendedorService.getAll();
            if (!vendedores) {
                res.status(400).send('No hay vendedores');
            } else {
                res.status(200).render('vendedores/lista', { vendedores });
            }
        }
        catch (error) {
            res.status(500).send(error.message);
        }
    }

    static async getById(req, res) {
        try {
            const id = req.params.id;
            const result = await VendedorService.getById(id);
            if (!result) {
                res.status(400).send('Vendedor no existente');
            } else {
                res.status(200).json(result);
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