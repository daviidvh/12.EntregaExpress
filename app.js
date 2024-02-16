/**
 * Importa el módulo 'express' y lo asigna a la variable `express`.
 * Crea una aplicación Express y la asigna a la variable `app`.
 * Importa el middleware 'body-parser'.
 */
const express = require('express');
const app = express();
const bodyParser = require('body-parser');


/**
 * Configura Express para usar body-parser con formato JSON.
 * Configura Express para usar body-parser con codificación de URL extendida.
 * Configura Express para servir archivos estáticos desde el directorio 'public'.
 */

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));


// Importamos las rutas de vuelos.js
const vuelos = require('./routes/vuelos');
// Usamos dentro de nuestra instancia express() las rutas
app.use('/vuelos', vuelos);

//Establecemos el puerto y la ruta de ejecucion
const port = 3001;
app.listen(port, () => {
    console.log(`Enlace para ejecutar la aplicacion: http://localhost:${port}/vuelos/index`);
});
