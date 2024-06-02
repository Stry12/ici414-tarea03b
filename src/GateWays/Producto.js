const pool = require('../ConexionDB/conexion.js');

class ProductoGateWay {
    static async create(idV,idC,idT, precio, conexion) {
        await conexion.query('INSERT INTO producto (numeroVendedor,idComprador,idTipoProducto,precioCompra) VALUES (?,?,?,?)', [idV,idC,idT,precio]);
    }

    static async getAll() {
        const [rows] = await pool.promise().query('SELECT * FROM producto');
        return rows;
    }

    static async getBynumeroVendedor(id) {
        const [rows] = await pool.promise().query('SELECT * FROM producto WHERE numeroVendedor = ?', [id]);
        return rows;
    }

    static async getByidComprador(id) {
        const [rows] = await pool.promise().query('SELECT * FROM producto WHERE idComprador = ?', [id]);
        return rows;
    }

    static async getByidTipoProducto(id) {
        const [rows] = await pool.promise().query('SELECT * FROM producto WHERE idTipoProducto = ?', [id]);
        return rows;
    }

    static async updatePrecioCompra(idV,idC,idT, precio, conexion) {
        await conexion.query('UPDATE producto SET precioCompra = ? WHERE numeroVendedor = ? AND idComprador = ? AND idTipoProducto = ?', [precio, idV,idC,idT]);
    }

    static async delete(idV,idC,idT, conexion) {
        await conexion.query('DELETE FROM producto WHERE numeroVendedor = ? AND idComprador = ? AND idTipoProducto = ?', [idV,idC,idT]);
    }

    static async deleteBynumeroVendedor(id) {
        const [rows] = await pool.promise().query('DELETE FROM producto WHERE numeroVendedor = ?', [id]);
        return rows;
    }

    static async deleteByidComprador(id) {
        const [rows] = await pool.promise().query('DELETE FROM producto WHERE idComprador = ?', [id]);
        return rows;
    }

    static async deleteByidTipoProducto(id) {
        const [rows] = await pool.promise().query('DELETE FROM producto WHERE idTipoProducto = ?', [id]);
        return rows;
    }

    static async getByCombination(idV,idC,idT){
        const [rows] = await pool.promise().query('SELECT * FROM producto WHERE numeroVendedor = ? AND idComprador = ? AND idTipoProducto = ?', [idV,idC,idT]);
        return rows;
    }

    static async exist(idV,idC,idT, conexion) {
        const [rows] = await conexion.query('SELECT * FROM producto WHERE numeroVendedor = ? AND idComprador = ? AND idTipoProducto = ?', [idV,idC,idT]);
        return rows.length > 0;
    }
}

module.exports = ProductoGateWay;