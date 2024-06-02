const ProductoGateWay = require('../GateWays/Producto.js');
const VendedorGateWay = require('../GateWays/Vendedor.js');
const CompradorGateWay = require('../GateWays/Comprador.js');
const TipoProductoGateWay = require('../GateWays/TipoProducto.js');
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

    static async verificar_precio(precio){
        if(precio < 0){
            return false;
        }else{
            return true;
        }
    }

    static async deleteByidComprador(id) {
        const exist = await ProductoService.verificar_existenciaComprador(id);
        if(exist){
            const rows = await ProductoGateWay.deleteByidComprador(id);
            return true;
        }
        return false;
    }

    static async deleteByidTipoProducto(id) {
        const exist = await ProductoService.verificar_existenciaTipoProducto(id);
        if(exist){
            const rows = await ProductoGateWay.deleteByidTipoProducto(id);
            return true;
        }
        return false;
    }

    static async deleteBynumeroVendedor(id) {
        const exist = await ProductoService.verificar_existenciaVendedor(id);
        if(exist){
            const rows = await ProductoGateWay.deleteBynumeroVendedor(id);
            return true;
        }
        return false;
    }
}

module.exports = ProductoService;