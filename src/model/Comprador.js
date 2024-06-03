const pool = require('../ConexionDB/conexion.js');

class CompradorGateWay {

    static async getAll() {
        const [rows] = await pool.promise().query('SELECT * FROM comprador');
        return rows;
    }

    static async getById(id) {
        const [rows] = await pool.promise().query('SELECT * FROM comprador WHERE idComprador = ?', [id]);
        return rows;
    }

    static async exist(id,connection) {
        const [rows] = await connection.execute('SELECT * FROM comprador WHERE idComprador = ?', [id]);
        return rows.length > 0;
    }

    static async create(id,nombre, connection) {
        await connection.execute('INSERT INTO comprador (idComprador, nombreComprador) VALUES (?, ?)', [id, nombre]);
    }

    static async updateNombre(id, comprador, connection) {
        await connection.query('UPDATE comprador SET nombreComprador = ? WHERE idComprador = ?', [comprador, id]);
    }

    static async updateID(id, nuevoID,connection) {
        await connection.query('UPDATE comprador SET idComprador = ? WHERE idComprador = ?', [nuevoID,id]);
    }

    static async delete(id,connection) {
        await connection.query('DELETE FROM comprador WHERE idComprador = ?', [id]);
    }
}

module.exports = CompradorGateWay;