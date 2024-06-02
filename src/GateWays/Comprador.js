

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

    static async create(id,comprador) {
        const [rows] = await pool.promise().query('INSERT INTO comprador (idComprador,nombreComprador) VALUES (?,?)', [id,comprador]);
        return rows;
    }

    static async updateNombre(id, comprador) {
        const [rows] = await pool.promise().query('UPDATE comprador SET nombreComprador = ? WHERE idComprador = ?', [comprador, id]);
        return rows;
    }

    static async updateID(id, nuevoID) {
        const [rows] = await pool.promise().query('UPDATE comprador SET idComprador = ? WHERE idComprador = ?', [nuevoID,id]);
        return rows;
    }

    static async delete(id) {
        const [rows] = await pool.promise().query('DELETE FROM comprador WHERE idComprador = ?', [id]);
        return rows;
    }
}

module.exports = CompradorGateWay;