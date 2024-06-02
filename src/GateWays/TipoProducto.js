const pool = require('../ConexionDB/conexion.js');

class TipoProductoGateWay {
    
        static async getAll() {
            const [rows] = await pool.promise().query('SELECT * FROM tipoproducto');
            return rows;
        }
    
        static async getById(id) {
            const [rows] = await pool.promise().query('SELECT * FROM tipoproducto WHERE idTipoProducto = ?', [id]);
            return rows;
        }
    
        static async create(id,tipoProducto) {
            const [rows] = await pool.promise().query('INSERT INTO tipoproducto (idTipoProducto,descripcionProducto) VALUES (?,?)', [id,tipoProducto]);
            return rows;
        }
    
        static async updateDescripcion(id, tipoProducto) {
            const [rows] = await pool.promise().query('UPDATE tipoproducto SET descripcionProducto = ? WHERE idTipoProducto = ?', [tipoProducto, id]);
            return rows;
        }
    
        static async updateID(id, nuevoID) {
            const [rows] = await pool.promise().query('UPDATE tipoproducto SET idTipoProducto = ? WHERE idTipoProducto = ?', [nuevoID,id]);
            return rows;
        }

        static async delete(id) {
            const [rows] = await pool.promise().query('DELETE FROM tipoproducto WHERE idTipoProducto = ?', [id]);
            return rows;
        }
}

module.exports = TipoProductoGateWay;