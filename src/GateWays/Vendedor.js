const db = require('../ConexionDB/conexion.js');
const mysql = require('mysql2');

const pool = mysql.createPool(db);

class VendedorGateWay {

    static async getAll() {
        const [rows] = await pool.promise().query('SELECT * FROM Vendedor');
        return rows;
    }
}

module.exports = VendedorGateWay;