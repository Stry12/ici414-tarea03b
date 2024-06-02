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

    static async create(id,vendedor) {
        const [rows] = await pool.promise().query('INSERT INTO Vendedor (numeroVendedor,nombreVendedor) VALUES (?,?)', [id,vendedor]);
        return rows;
    }

    static async updateNombre(id, vendedor) {
        const [rows] = await pool.promise().query('UPDATE Vendedor SET nombreVendedor = ? WHERE numeroVendedor = ?', [vendedor, id]);
        return rows;
    }

    static async updateID(id, nuevoID) {
        console.log(id);
        console.log(nuevoID);
        const [rows] = await pool.promise().query('UPDATE vendedor SET numeroVendedor = ? WHERE numeroVendedor = ?', [nuevoID,id]);
        console.log(rows);
        return rows;
    }

    static async delete(id) {
        const [rows] = await pool.promise().query('DELETE FROM Vendedor WHERE numeroVendedor = ?', [id]);
        return rows;
    }
}

module.exports = VendedorGateWay;