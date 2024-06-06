const CompradorGateWay = require('../model/Comprador.js');
const ProductoGateWay = require('../model/Producto.js');

const pool = require('../ConexionDB/conexion.js');

class CompradorService {

    static async crear(id,nombre){
        const conexion = await pool.getConnection();
        try{
          await conexion.beginTransaction();
            
          const nombreV = await this.validarNombreCompleto(nombre);
          const existV = await CompradorGateWay.exist(id,conexion);
          const existP = await ProductoGateWay.existByidComprador(id,conexion);


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

          await ProductoGateWay.deleteByidComprador(id,conexion);

          await CompradorGateWay.create(id,nombre,conexion);

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

  static async updateNombre(id, nombre){
      const conexion = await pool.getConnection();
      try {
          await conexion.beginTransaction();

          const nombreV = await this.validarNombreCompleto(nombre);
          const existV = await CompradorGateWay.exist(id,conexion);

          if (!existV) {
              await conexion.rollback();
              return false;
          }
          if (!nombreV) {
              await conexion.rollback();
              return false;
          }

          await CompradorGateWay.updateNombre(id,nombre,conexion);

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

          const existV = await CompradorGateWay.exist(id,conexion);
          const existN = await CompradorGateWay.exist(nuevoID,conexion);
          const existP = await ProductoGateWay.existByidComprador(id,conexion);

          if (existN) {
              await conexion.rollback();
              return false;
          }
          if (!existV) {
              await conexion.rollback();
              return false;
          }

          if (existP) {
            await ProductoGateWay.updateIdComprador(id,nuevoID,conexion);
          }

          await CompradorGateWay.updateID(id,nuevoID,conexion);

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

          const existV = await CompradorGateWay.exist(id,conexion);
          const existP = await ProductoGateWay.existByidComprador(id,conexion);

          if (!existV) {
              await conexion.rollback();
              return false;
          }

          if (existP) {
                await ProductoGateWay.deleteByidComprador(id,conexion);
          }

          await CompradorGateWay.delete(id,conexion);

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

    static async getById(id) {
        const conexion = await pool.getConnection();
        try{
            await conexion.beginTransaction();
            const exist = await CompradorGateWay.exist(id,conexion);


            if (!exist) {
                await conexion.rollback();
                return false;
            }

            const comprador = await CompradorGateWay.getById(id,conexion);

            await conexion.commit();
            return comprador;
        } catch (error) {
            await conexion.rollback();
            return false;
        } finally {
            conexion.release();
        }
    }


    static async getAll() {
        const conexion = await pool.getConnection();
        try{
            await conexion.beginTransaction();

            const compradores = await CompradorGateWay.getAll(conexion);

            await conexion.commit();
            return compradores;
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

module.exports = CompradorService;