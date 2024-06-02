const ProductoService = require('../Services/Producto');

class ProductoController {
    static async create(req, res) {
        const { idV = null,idC = null,idT = null , precio = null } = req.body;
  
        if (idV != null && idC != null && idT != null && precio != null ) {
            const response = await ProductoService.create(idV,idC,idT, precio);
            if (response) {
                res.status(201).json({ message: 'Producto creado' });
            } else {
                res.status(300).json({ message: 'Error al crear el producto o ya existe' });
            }
        } else {
            res.status(400).json({ message: 'Faltan datos' });
        }
    }

    static async updatePrecioCompra(req, res) {
        const { idV = null,idC = null,idT = null , precio = null } = req.body;
        if (idV != null && idC != null && idT != null && precio != null) {
            const response = await ProductoService.updatePrecioCompra(idV,idC,idT, precio);
            if (response) {
                res.status(200).json({ message: 'Precio actualizado' });
            } else {
                res.status(300).json({ message: 'Error al actualizar el precio' });
            }
        } else {
            res.status(400).json({ message: 'Faltan datos' });
        }
    }

    static async deleteByComination(req, res) {
        const { idV = null,idC = null,idT = null } = req.body;
        if (idV != null && idC != null && idT != null) {
            const response = await ProductoService.deleteByComination(idV,idC,idT);
            if (response) {
                res.status(200).json({ message: 'Producto eliminado' });
            } else {
                res.status(300).json({ message: 'Error al eliminar el producto o no existe' });
            }
        } else {
            res.status(400).json({ message: 'Faltan datos' });
        }
    }

    static async deleteByidComprador(req, res) {
        const { id = null } = req.body;
        if (id != null) {
            const response = await ProductoService.deleteByidComprador(id);
            if (response) {
                res.status(200).json({ message: 'Producto eliminado' });
            } else {
                res.status(400).json({ message: 'Error al eliminar el producto' });
            }
        } else {
            res.status(400).json({ message: 'Faltan datos' });
        }
    }
    
    static async deleteByidTipoProducto(req, res) {
        const { id } = req.body;
        if (id) {
            const response = await ProductoService.deleteByidTipoProducto(id);
            if (response) {
                res.status(200).json({ message: 'Producto eliminado' });
            } else {
                res.status(400).json({ message: 'Error al eliminar el producto' });
            }
        } else {
            res.status(400).json({ message: 'Faltan datos' });
        }
    }

    static async deleteBynumeroVendedor(req, res) {
        const { id } = req.body;
        if (id) {
            const response = await ProductoService.deleteBynumeroVendedor(id);
            if (response) {
                res.status(200).json({ message: 'Producto eliminado' });
            } else {
                res.status(400).json({ message: 'Error al eliminar el producto' });
            }
        } else {
            res.status(400).json({ message: 'Faltan datos' });
        }
    }

}

module.exports = ProductoController;