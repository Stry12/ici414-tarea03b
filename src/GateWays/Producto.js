const pool = require('../ConexionDB/conexion.js');

class ProductoGateWay {
    static async create(idV,idC,idT, precio, conexion) {
        await conexion.query('INSERT INTO producto (numeroVendedor,idComprador,idTipoProducto,precioCompra) VALUES (?,?,?,?)', [idV,idC,idT,precio]);
    }

    static async updatePrecioCompra(idV,idC,idT, precio, conexion) {
        await conexion.query('UPDATE producto SET precioCompra = ? WHERE numeroVendedor = ? AND idComprador = ? AND idTipoProducto = ?', [precio, idV,idC,idT]);
    }

    static async delete(idV,idC,idT, conexion) {
        await conexion.query('DELETE FROM producto WHERE numeroVendedor = ? AND idComprador = ? AND idTipoProducto = ?', [idV,idC,idT]);
    }

    static async deleteBynumeroVendedor(id,conexion) {
        await conexion.query('DELETE FROM producto WHERE numeroVendedor = ?', [id]);
    }

    static async deleteByidComprador(id,conexion) {
        await conexion.query('DELETE FROM producto WHERE idComprador = ?', [id]);
    }

    static async deleteByidTipoProducto(id,conexion) {
        await conexion.query('DELETE FROM producto WHERE idTipoProducto = ?', [id]);
    }

    static async exist(idV,idC,idT, conexion) {
        const [rows] = await conexion.query('SELECT * FROM producto WHERE numeroVendedor = ? AND idComprador = ? AND idTipoProducto = ?', [idV,idC,idT]);
        return rows.length > 0;
    }

    static async existByidComprador(id, conexion) {
        const [rows] = await conexion.query('SELECT * FROM producto WHERE idComprador = ?', [id]);
        return rows.length > 0;
    }

    static async existByidTipoProducto(id, conexion) {
        const [rows] = await conexion.query('SELECT * FROM producto WHERE idTipoProducto = ?', [id]);
        return rows.length > 0;
    }

    static async existBynumeroVendedor(id, conexion) {
        const [rows] = await conexion.query('SELECT * FROM producto WHERE numeroVendedor = ?', [id]);
        return rows.length > 0;
    }
}

module.exports = ProductoGateWay;