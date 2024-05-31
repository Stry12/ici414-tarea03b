const VendedorGateWay = require('../GateWays/Vendedor.js');

class VendedorController {

    static async getAll(req, res) {
        try {
            const vendedores = await VendedorGateWay.getAll();
            res.json(vendedores);
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal server error');
        }
    }
}

module.exports = VendedorController;