const { pedido } = require('./config');

/*
Estructura del body -> Crear    
{
    "Fecha": "2019-01-02T10:12:04",
    "Detalle": 
    [
        {
        "Id":"xHsRl949N5aptvF0M7vt",
        "Cantidad":2
        }
    ],
    "Cliente":
    {
        "Nombre":"Lopez",
        "NIT": 4488
    },

    "IdEmpleado":"ABCRl949N5aptvF0M7vt",
"Estado":"Entregado"
}
*/

//ObtenerPedidos
async function obtenerPedidos(){
    const snapshot = await pedido.get();
    const lista = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
    }))
    return lista;
}

module.exports = {
    obtenerPedidos
};