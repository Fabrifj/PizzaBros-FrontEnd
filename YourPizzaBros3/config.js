const firebase = require('firebase')
const firestore = require('firebase/firestore')

// Configuracion Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAXyGp_AK-2n7atboPbQCAmATWSO4t53-M",
  authDomain: "yourpizzabros3.firebaseapp.com",
  projectId: "yourpizzabros3",
  storageBucket: "yourpizzabros3.appspot.com",
  messagingSenderId: "639778295816",
  appId: "1:639778295816:web:7264b8fe7e2ee8bef041bd"
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);
// Acceder a Firestore
const db = firebase.firestore();

// Obtener las colecciones necesarias
const elemento = db.collection("Elemento");
const producto = db.collection("Producto");
const categoria = db.collection("Categoria");
const cliente = db.collection("Cliente");
const pedido = db.collection("Pedido");
const compra = db.collection("Compra");

module.exports = { firebase,producto,cliente,pedido,categoria,elemento,compra};
