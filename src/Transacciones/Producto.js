const ProductoGateWay = require('../model/Producto.js');
const VendedorGateWay = require('../model/Vendedor.js');
const CompradorGateWay = require('../model/Comprador.js');
const TipoProductoGateWay = require('../model/TipoProducto.js');
const pool = require('../ConexionDB/conexion.js');

class ProductoService {

    static async create(idV,idC,idT, precio ) {
        const conexion = await pool.getConnection();
        try {
            await conexion.beginTransaction();

            const existV = await VendedorGateWay.exist(idV, conexion);

            const existC = await CompradorGateWay.exist(idC, conexion);

            const existT = await TipoProductoGateWay.exist(idT, conexion);

            const existP = await ProductoGateWay.exist(idV,idC,idT, conexion);

            const verificar_precio = await this.verificar_precio(precio);

            if (!existV || !existC || !existT || existP) {
                await conexion.rollback();
                return false;
            }

            if(!verificar_precio){
                await conexion.rollback();
                return false;
            }


            await ProductoGateWay.create(idV,idC,idT, precio, conexion);

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

    static async updatePrecioCompra(idV,idC,idT, precio) {
        const conexion = await pool.getConnection();
        try {
            await conexion.beginTransaction();

            const exist = await ProductoGateWay.exist(idV,idC,idT, conexion);
            const verificar_precio = await this.verificar_precio(precio);
            if (!exist) {
                await conexion.rollback();
                return false;
            }
            if(!verificar_precio){
                await conexion.rollback();
                return false;
            }

            await ProductoGateWay.updatePrecioCompra(idV,idC,idT, precio, conexion);
            console.log("Precio actualizado");

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

    static async deleteByComination(idV,idC,idT){
        const conexion = await pool.getConnection();
        try {
            await conexion.beginTransaction();

            const exist = await ProductoGateWay.exist(idV,idC,idT, conexion);
            if (!exist) {
                await conexion.rollback();
                return false;
            }

            await ProductoGateWay.delete(idV,idC,idT, conexion);

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

    static async deleteByidComprador(id) {
        const conexion = await pool.getConnection();
        try {
            await conexion.beginTransaction();

            const existC = await CompradorGateWay.exist(id, conexion);

            const existP = await ProductoGateWay.existByidComprador(id, conexion);
            
            if (!existC || !existP) {
                await conexion.rollback();
                return false;
            }

            await ProductoGateWay.deleteByidComprador(id, conexion);

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

    static async deleteByidTipoProducto(id) {
        const conexion = await pool.getConnection();
        try {
            await conexion.beginTransaction();

            const existT = await TipoProductoGateWay.exist(id, conexion);

            const existP = await ProductoGateWay.existByidTipoProducto(id, conexion);
            
            if (!existT || !existP) {
                await conexion.rollback();
                return false;
            }

            await ProductoGateWay.deleteByidTipoProducto(id, conexion);

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

    static async deleteBynumeroVendedor(id) {
        const conexion = await pool.getConnection();
        try {
            await conexion.beginTransaction();

            const existV = await VendedorGateWay.exist(id, conexion);

            const existP = await ProductoGateWay.existBynumeroVendedor(id, conexion);
            
            if (!existV || !existP) {
                await conexion.rollback();
                return false;
            }

            await ProductoGateWay.deleteBynumeroVendedor(id, conexion);

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

    static async verificar_precio(precio){
        if(precio < 0){
            return false;
        }else{
            return true;
        }
    }
}

module.exports = ProductoService;