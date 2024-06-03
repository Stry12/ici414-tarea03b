const pool = require('../ConexionDB/conexion.js');

class VendedorGateWay {

    static async getAll() {
        const [rows] = await pool.promise().query('SELECT * FROM Vendedor');
        return rows;
    }

    static async getById(id) {
        const [rows] = await pool.promise().query('SELECT * FROM Vendedor WHERE numeroVendedor = ?', [id]);
        return rows;
    }

    static async create(id,vendedor, conexion) {
        await conexion.query('INSERT INTO Vendedor (numeroVendedor,nombreVendedor) VALUES (?,?)', [id,vendedor]);
    }

    static async exist(id, conexion) {
        const [rows] = await conexion.query('SELECT * FROM Vendedor WHERE numeroVendedor = ?', [id]);
        return rows.length > 0;
    }

    static async updateNombre(id, vendedor, conexion) {
        await conexion.query('UPDATE Vendedor SET nombreVendedor = ? WHERE numeroVendedor = ?', [vendedor, id]);
    }

    static async updateID(id, nuevoID,conexion) {
        await conexion.query('UPDATE vendedor SET numeroVendedor = ? WHERE numeroVendedor = ?', [nuevoID,id]);
    }

    static async delete(id, conexion) {
        conexion.query('DELETE FROM Vendedor WHERE numeroVendedor = ?', [id]);
    }
}

module.exports = VendedorGateWay;