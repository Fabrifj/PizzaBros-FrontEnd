const { producto } = require('./config');

async function crearProducto(body){
    await producto.add(body);
    resp = {
        "Mensaje" : "Producto agregado correctamente",
        "Producto": body
    }
    return resp;
}


module.exports = { crearProducto };
