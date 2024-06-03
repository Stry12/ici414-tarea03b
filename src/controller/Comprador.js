const CompradorService = require('../Services/Comprador');
const CompradorGateWay = require('../model/Comprador.js');
const pool = require('../ConexionDB/conexion.js');

function validarNombreCompleto(nombreCompleto) {
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

class CompradorController {
    static async getAll(req, res) {
        try {
            const compradores = await CompradorService.getAll();
            res.json(compradores);
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal server error');
        }
    }

    static async getById(req, res) {
        try {
            const comprador = await CompradorService.getById(req.params.id);
            
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal server error');
        }
    }

    static async create(req, res) {
        try {
            const { id,nombre } = req.body;
            const comprador = await CompradorService.crear(id,nombre);
            if (!comprador) {
                return res.status(400).send('Comprador already exists');
            }
            res.status(200).json({mensaje: 'Comprador creado correctamente'});
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal server error');
        }
    }

    static async updateNombre(req, res) {
        try {
            const comprador = await CompradorService.updateNombre(req.params.id, req.body.nombre);
            if (!comprador) {
                return res.status(404).send('Comprador not found');
            }
            res.status(200).json({mensaje: 'Comprador actualizado correctamente'});
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal server error');
        }
    }

    static async updateNombre2(req, res) {
        const id = req.params.id
        const {nombre} = req.body;
        const conexion = await pool.getConnection();

        try{
            await conexion.beginTransaction();
  
            const nombreV = await validarNombreCompleto(nombre);
            const existV = await CompradorGateWay.exist(id,conexion);
  
            if (!existV) {
                await conexion.rollback();
                res.status(404).send('Comprador not found');
            }
            if (!nombreV) {
                await conexion.rollback();
                res.status(300).send('Invalid name');
            }
  
            await CompradorGateWay.updateNombre(id,nombre,conexion);
  
            await conexion.commit();
            res.status(200).json({mensaje: 'Comprador actualizado correctamente'});
        } catch (error) {
            await conexion.rollback();
            console.error(error);
            res.status(500).send('Internal server error');
        } finally {
            conexion.release();
        }
    }

    static async updateID(req, res) {
        try {
            const comprador = await CompradorService.updateID(req.params.id, req.body.id);
            if (!comprador) {
                return res.status(404).send('Comprador not found');
            }
            res.status(200).json({mensaje: 'id de comprador actualizada correctamente'});
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal server error');
        }
    }

    static async delete(req, res) {
        try {
            const comprador = await CompradorService.delete(req.params.id);
            if (comprador === false) {
                return res.status(404).send('Comprador not found');
            }
            return res.status(200).json({mensaje: 'Comprador eliminado correctamente'});
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal server error');
        }
    }
}

module.exports = CompradorController;
