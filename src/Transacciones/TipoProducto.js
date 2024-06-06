const TipoProductoGateWay = require('../model/TipoProducto.js');
const ProductoGateWay = require('../model/Producto.js');
const pool = require('../ConexionDB/conexion.js');


class TipoProductoService {
    static async crear(id, descripcionProducto) {
        const conexion = await pool.getConnection();
        try{
            await conexion.beginTransaction();

            const existP = await ProductoGateWay.existByidTipoProducto(id, conexion);
            const existTP = await TipoProductoGateWay.exist(id, conexion);
            if (existTP) {
                await conexion.rollback();
                return false;
            }

            if (existP) {
                await conexion.rollback();
                return false;
            }

            await ProductoGateWay.deleteByidTipoProducto(id, conexion);

            await TipoProductoGateWay.create(id, descripcionProducto, conexion);

            await conexion.commit();
            return true;
        } catch (error) {
            await conexion.rollback();
            return false;
        }
        finally {
            conexion.release();
        }
    }

    static async getAll() {
        const conexion = await pool.getConnection();
        try {
            const result = await TipoProductoGateWay.getAll(conexion);
            return result;
        } catch (error) {
            return false;
        }
        finally {
            conexion.release();
        }
    }

    static async getById(id) {
        const conexion = await pool.getConnection();
        try {
            const result = await TipoProductoGateWay.getById(id, conexion);
            return result;
        } catch (error) {
            return false;
        }
        finally {
            conexion.release();
        }
    }

    static async updateDescripcion(id, descripcionProducto) {
        const conexion = await pool.getConnection();
        try{
            await conexion.beginTransaction();

            const existTP = await TipoProductoGateWay.exist(id, conexion);

            if (!existTP) {
                await conexion.rollback();
                return false;
            }

            await TipoProductoGateWay.updateDescripcion(id, descripcionProducto, conexion);

            await conexion.commit();
            return true;
        } catch (error) {
            await conexion.rollback();
            return false;
        }
        finally {
            conexion.release();
        }
    }

    static async updateID(id, nuevoID) {
        const conexion = await pool.getConnection();
        try{
            await conexion.beginTransaction();
        
            const existTP = await TipoProductoGateWay.exist(id, conexion);
            const existN = await TipoProductoGateWay.exist(nuevoID, conexion);
            const existP = await ProductoGateWay.existByidTipoProducto(id, conexion);

            if (!existTP) {
                await conexion.rollback();
                return false;
            }

            if (existN) {
                await conexion.rollback();
                return false;
            }

            const data = await TipoProductoGateWay.getById(id, conexion);
            await TipoProductoGateWay.create(nuevoID,data[0].descripcionProducto, conexion);

            if (existP) {
                await ProductoGateWay.updateIdTipoProducto(id, nuevoID, conexion);
            }

            await TipoProductoGateWay.delete(id, conexion);

            await conexion.commit();
            return true;
        } catch (error) {
            await conexion.rollback();
            return false;
        }
        finally {
            conexion.release();
        }
    }

    static async delete(id) {
        const conexion = await pool.getConnection();
        try {
            await conexion.beginTransaction();

            const existTP = await TipoProductoGateWay.exist(id, conexion);
            const existP = await ProductoGateWay.existByidTipoProducto(id, conexion);

            if (!existTP) {
                await conexion.rollback();
                return false;
            }

            if (existP) {
                await ProductoGateWay.deleteByidTipoProducto(id, conexion);
            }

            await TipoProductoGateWay.delete(id, conexion);

            await conexion.commit();
            return true;
        } catch (error) {
            await conexion.rollback();
            return false;
        }
        finally {
            conexion.release();
        }
    }
}

module.exports = TipoProductoService;