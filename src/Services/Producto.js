const ProductoGateWay = require('../GateWays/Producto.js');

class ProductoService {

    static async create(idV,idC,idT, precio ) {
        const rows = await ProductoGateWay.create(idV,idC,idT, precio);
        return rows;
    }

    static async updatePrecioCompra(idV,idC,idT, precio) {
        const exist = await ProductoService.verificar_existenciaCombinacion(idV,idC,idT);
        if(exist){
            const rows = await ProductoGateWay.updatePrecioCompra(idV,idC,idT, precio);
            return true;
        }
        return false;
    }

    static async deleteByComination(idV,idC,idT){
        const exist = await ProductoService.verificar_existenciaCombinacion(idV,idC,idT);
        if(exist){
            const rows = await ProductoGateWay.delete(idV,idC,idT);
            return true;
        }
        return false;
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



    static async verificar_existenciaVendedor(id){
        const rows = await ProductoGateWay.getBynumeroVendedor(id);
        if(rows.length == 0){
            return false;
        }else{
            return true;
        }
    }

    static async verificar_existenciaComprador(id){
        const rows = await ProductoGateWay.getByidComprador(id);
        if(rows.length == 0){
            return false;
        }else{
            return true;
        }
    }

    static async verificar_existenciaTipoProducto(id){
        const rows = await ProductoGateWay.getByidTipoProducto(id);
        if(rows.length == 0){
            return false;
        }else{
            return true;
        }
    }
}

module.exports = ProductoService;