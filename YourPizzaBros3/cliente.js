const { cliente } = require('./config');

/*  
Estructura del body -> Crear
{
  "NIT": "794938",
  "Nombre": "Boris Jose"
}    
*/ 

//CrearCliente
async function crearCliente(data) {
  const nit = data.NIT
  var respuesta = null;
  let query = cliente.where('NIT', '==', nit);
  let querySnapshot = await query.get();

  if (querySnapshot.empty) {
    console.log(`No se encontro al cliente con el NIT: ${nit}, se procedera a crearlo`);
    await cliente.add(data)
    respuesta = data
  } else {
    console.log('Se encontro al cliente con el NIT: ', nit);
    querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    querySnapshot.docs.forEach(documentSnapshot => {
      console.log(`Id del cliente: ${documentSnapshot.id}`);
    });
    if (querySnapshot.length = 1) {
      console.log("querySnapshot: ", querySnapshot.docs[0].data());
      if (querySnapshot.docs[0].data().Nombre == data.Nombre) {
        console.log("SI ES LA MISMA PERSONA");
        respuesta = querySnapshot.docs[0].data();
      }
    }
  }
  return respuesta;
}

//ObtenerClientes
async function obtenerClientes() {
    const snapshot = await cliente.get();
    const lista = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
    }))
    return lista;
}

//ObtenerClienteNit
async function obtenerClienteNit(nitCliente) {
  nitCliente = parseInt(nitCliente, 10);
  let query = await cliente.where('NIT', '==', nitCliente);
  let querySnapshot = await query.get();
  let respuesta = null;

  if (querySnapshot.empty) {
    console.log(`No encontramos al cliente con nit: ${nitCliente}`);
  } else {
    console.log('Encontramos al nit: ', nitCliente);
    respuesta = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  }
  return respuesta;
}

// Hacen falta funciones para poder actualizar y eliminar un cliente.


module.exports = {
  crearCliente,
  obtenerClientes, 
  obtenerClienteNit
};

