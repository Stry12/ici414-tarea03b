const pool = require('../ConexionDB/conexion.js');

class TipoProductoGateWay {
    
        static async getAll(conexion) {
            const [rows] = await conexion.query('SELECT * FROM tipoproducto');
            return rows;
        }
    
        static async getById(id,conexion) {
            const [rows] = await conexion.query('SELECT * FROM tipoproducto WHERE idTipoProducto = ?', [id]);
            return rows;
        }

        static async exist(id,conexion) {
            const [rows] = await conexion.query('SELECT * FROM tipoproducto WHERE idTipoProducto = ?', [id]);
            return rows.length > 0;
        }
    
        static async create(id,tipoProducto,conexion) {
            await conexion.query('INSERT INTO tipoproducto (idTipoProducto,descripcionProducto) VALUES (?,?)', [id,tipoProducto]);
        }
    
        static async updateDescripcion(id, tipoProducto,conexion) {
            await conexion.query('UPDATE tipoproducto SET descripcionProducto = ? WHERE idTipoProducto = ?', [tipoProducto, id]);
        }
    
        static async updateID(id, nuevoID,conexion) {
            await conexion.query('UPDATE tipoproducto SET idTipoProducto = ? WHERE idTipoProducto = ?', [nuevoID,id]);
        }

        static async delete(id,conexion) {
            await conexion.query('DELETE FROM tipoproducto WHERE idTipoProducto = ?', [id]);
        }
}

module.exports = TipoProductoGateWay;