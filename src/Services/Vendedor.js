const VendedorGateWay = require('../GateWays/Vendedor.js');

class VendedorService {

    static async crearVendedor(id,nombre){
        const nombreV = this.validarNombreCompleto(nombre);
        const existV = this.validar_existencia(id);
        if (!existV || !nombreV) {
            return false;
        }
        return VendedorGateWay.create(id,nombre);
    }

    static async updateNombre(id, nombre){
        const nombreV = await  this.validarNombreCompleto(nombre);
        const existV = await this.validar_existencia(id);
        if (nombreV) {
            return false;
        }
        if(!existV){
            return false;
        }
        return VendedorGateWay.updateNombre(id,nombre);
    }

    static async updateID(id,nuevoID){
        const existV = await this.validar_existencia(id);
        const existN = await this.validar_existencia(nuevoID);

        if(existN){
            return false;
        }
        if(!existV){
            return false;
        }
        return VendedorGateWay.updateID(id,nuevoID);
    }

    static async delete(id){
        const existV = await this.validar_existencia(id);
        if(!existV){
            return false;
        }
        return VendedorGateWay.delete(id);
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

    static async validar_existencia(id){
        const exist = await VendedorGateWay.getById(id);

        if (exist.length === 0) {
            return false;
        }
        return true;
    }
}

module.exports = VendedorService;