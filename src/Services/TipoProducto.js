const TipoProductoGateWay = require('../GateWays/TipoProducto.js');

class TipoProductoService {
    static async crearTipoProducto(id, descripcionProducto) {
        const existTP = await this.validar_existencia(id);
        if (!existTP) {
            return false;
        }
        return TipoProductoGateWay.create(id, descripcionProducto);
    }

    static async updateDescripcion(id, descripcionProducto) {
        const existTP = await this.validar_existencia(id);
        console.log(existTP);
        if (!existTP) {
            return false;
        }
        return TipoProductoGateWay.updateDescripcion(id, descripcionProducto);
    }

    static async updateID(id, nuevoID) {
        const existTP = await this.validar_existencia(id);
        const existN = await this.validar_existencia(nuevoID);
        if (existN) {
            return false;
        }
        if (!existTP) {
            return false;
        }
        return TipoProductoGateWay.updateID(id, nuevoID);
    }

    static async delete(id) {
        const existTP = await this.validar_existencia(id);
        if (!existTP) {
            return false;
        }
        return TipoProductoGateWay.delete(id);
    }

    static async validar_existencia(id) {
        const result = await TipoProductoGateWay.getById(id);
        console.log(result.length === 0);
        if (result.length === 0) {
            return false;
        }
        return true;
    }
}

module.exports = TipoProductoService;