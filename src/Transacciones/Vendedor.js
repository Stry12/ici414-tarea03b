const VendedorGateWay = require('../model/Vendedor.js');
const ProductoGateWay = require('../model/Producto.js');
const pool = require('../ConexionDB/conexion.js');

class VendedorService {

    static async crearVendedor(id,nombre){
        const conexion = await pool.getConnection();
        try{
            await conexion.beginTransaction();

            const nombreV = await this.validarNombreCompleto(nombre);
            const existV = await VendedorGateWay.exist(id,conexion);
            const existP = await ProductoGateWay.existBynumeroVendedor(id,conexion);

            if (existV) {
                await conexion.rollback();
                return false;
            }
            if (!nombreV) {
                await conexion.rollback();
                return false;
            }

            if (existP) {
                await conexion.rollback();
                return false;
            }

            await ProductoGateWay.deleteBynumeroVendedor(id,conexion);

            await VendedorGateWay.create(id,nombre,conexion);

            await conexion.commit();
            return true;
        }catch(error){
            await conexion.rollback();
            return false;
        } finally {
            conexion.release();
        }
    }

    static async getAll(){
        const conexion = await pool.getConnection();
        try {
            const result = await VendedorGateWay.getAll(conexion);
            return result;
        } catch (error) {
            return false;
        }
        finally {
            conexion.release();
        }
    }

    static async getById(id){
        const conexion = await pool.getConnection();
        try {
            const result = await VendedorGateWay.getById(id,conexion);
            return result;
        } catch (error) {
            return false;
        }
        finally {
            conexion.release();
        }
    }
    
    static async updateNombre(id, nombre){
        const conexion = await pool.getConnection();
        try {
            await conexion.beginTransaction();

            const nombreV = await this.validarNombreCompleto(nombre);
            const existV = await VendedorGateWay.exist(id,conexion);

            if (!existV) {
                await conexion.rollback();
                return false;
            }
            if (!nombreV) {
                await conexion.rollback();
                return false;
            }

            await VendedorGateWay.updateNombre(id,nombre,conexion);

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

    static async updateID(id,nuevoID){
        const conexion = await pool.getConnection();
        try{
            await conexion.beginTransaction();

            const existV = await VendedorGateWay.exist(id,conexion);
            const existN = await VendedorGateWay.exist(nuevoID,conexion);
            const existP = await ProductoGateWay.existBynumeroVendedor(id,conexion);

            if (existN) {
                await conexion.rollback();
                return false;
            }
            if (!existV) {
                await conexion.rollback();
                return false;
            }

            if (existP) {
                await ProductoGateWay.updateID(id,nuevoID,conexion);
            }

            await VendedorGateWay.updateID(id,nuevoID,conexion);

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

            const existV = await VendedorGateWay.exist(id,conexion);
            const existP = await ProductoGateWay.existBynumeroVendedor(id,conexion);

            if (!existV) {
                await conexion.rollback();
                return false;
            }

            if (existP) {
                await ProductoGateWay.deleteBynumeroVendedor(id,conexion);
            }



            await VendedorGateWay.delete(id,conexion);

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


    static validarNombreCompleto(nombreCompleto) {
        const regex = /^[A-Z][a-z]+(\s[A-Z][a-z]+)+$/; 
          
        if (!regex.test(nombreCompleto)) {
            return false;
        }
          
        const caracteresEspeciales = /[^A-Za-z\s-]/; 
        if (caracteresEspeciales.test(nombreCompleto)) {
          return false;
        }

        return true;
    }
}

module.exports = VendedorService;