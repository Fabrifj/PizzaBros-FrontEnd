//const firestore = require('firebase/firestore')
const express = require('express')
const cors = require('cors');
const { query } = require('express');

database = require('./config')
const elemento = database.elemento;


//const { async } = require('@firebase/util')
const app = express()
app.use(express.json())
app.use(cors())

/*===================================
          CRUD ELEMENTO
//===================================*/
