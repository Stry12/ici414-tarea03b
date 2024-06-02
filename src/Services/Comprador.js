const CompradorGateWay = require('../GateWays/Comprador.js');

class CompradorService {

  static async crearComprador(id,nombre){
    this.validarNombreCompleto(nombre);
    const exist = this.validar_existencia(id);
    if (exist) {
      return false;
    }
    return CompradorGateWay.create(id,nombre);
  }

  static validarNombreCompleto(nombreCompleto) {
    const regex = /^[A-Z][a-z]+(\s[A-Z][a-z]+)+$/; 
  
    if (!regex.test(nombreCompleto)) {
        throw new Error('El nombre debe tener el formato Nombre Apellido');
    }
  
    const caracteresEspeciales = /[^A-Za-z\s-]/; 
    if (caracteresEspeciales.test(nombreCompleto)) {
      throw new Error('El nombre no puede contener caracteres especiales');
    }
  }

  static async delete(id){
    const exist = await this.validar_existencia(id);
    if (!exist) {
      return false;
    }
    
    return CompradorGateWay.delete(id);
  }

  static async validar_existencia(id){
    const exist = await CompradorGateWay.getById(id);
    if (exist.length === 0) {
      return false;
    }
    return true;
  }

  static async updateNombre(id, nombre){
    this.validarNombreCompleto(nombre);
    const exist = this.validar_existencia(id);

    if (!exist) {
      return false
    }
    return CompradorGateWay.updateNombre(id, nombre);;
  }

  static async updateID(id,nuevoID){
    const exist = await this.validar_existencia(id);
    const existNuevoID = await this.validar_existencia(nuevoID);
    console.log(exist);
    console.log(existNuevoID);
    if (existNuevoID) {
      return false;
    }

    if (!exist) {
      return false;
    }
    return CompradorGateWay.updateID(id,nuevoID);
  }
}

module.exports = CompradorService;