const pool = require('../ConexionDB/conexion.js');

class ProductoGateWay {
    static async create(idV,idC,idT, precio ) {
        const [rows] = await pool.promise().query('INSERT INTO producto (numeroVendedor,idComprador,numeroVendedor,precioCompra) VALUES (?,?,?,?)', [idV,idC,idT,precio]);
        return rows;
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

    static async updatePrecioCompra(id, precio) {
        const [rows] = await pool.promise().query('UPDATE producto SET precioCompra = ? WHERE numeroVendedor = ? AND idComprador = ? AND idTipoProducto = ?', [precio, id]);
        return rows;
    }

    static async delete(id) {
        const [rows] = await pool.promise().query('DELETE FROM producto WHERE numeroVendedor = ? AND idComprador = ? AND idTipoProducto = ?', [id]);
        return rows;
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
}

module.exports = ProductoGateWay;