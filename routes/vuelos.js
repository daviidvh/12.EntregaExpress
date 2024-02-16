/**
 * Importa el módulo Express.
 * Crea un enrutador de Express.
 * Importa el módulo MySQL para la conexión a la base de datos.
 */
const express = require('express');
const router = express.Router();
const mysql = require('mysql');

// Establecer la conexión a la base de datos al inicio de la aplicación
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 't2p2'
});
connection.connect();

// Importación del módulo 'path' para manejo de rutas de archivos y directorios en Node.js.
const path = require('path');



/**
 * Ruta GET para mostrar la página principal de vuelos.
 * 
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 * 
 * Uso:
 * - `GET /index`
 * 
 * Funcionalidad:
 * - Responde con el archivo HTML de la página principal de vuelos.
 * - Utiliza el método `sendFile` para enviar el archivo indicado por la ruta.
 * - La ruta del archivo se construye utilizando el módulo 'path'.
 * - Se manejan posibles errores durante el envío del archivo.
 */
router.get('/index', function (req, res) {

    res.sendFile(path.join(__dirname, '..', 'public', 'templates', 'vuelos', 'index.html'), (err) => {
        if (err) {
            res.status(err.status);
        } else {
            console.log('Encontrado correctamente');
        }
    });
});

/**
 * Ruta GET para obtener todos los vuelos desde la base de datos.
 * 
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 * 
 * Uso:
 * - `GET /all`
 * 
 * Funcionalidad:
 * - Realiza una consulta a la base de datos para obtener todos los vuelos.
 * - La consulta se realiza mediante la conexión a la base de datos.
 * - En caso de éxito, responde con un objeto JSON que contiene todos los vuelos.
 * - En caso de error, responde con un objeto JSON que indica el error ocurrido.
 */
router.get('/all', function (req, res) {
    let query = "SELECT * FROM vuelos";

    connection.query(query, [], function (error,rows) {
        if (error) {
            console.log(error);
            res.status(500).json({ error: 'Error en la consulta de la base de datos' });
        } else {
            res.json(rows);

        }
    });
});



/**
 * Ruta GET para ver detalles de un vuelo.
 * 
 * @param {Object} req - Objeto de solicitud HTTP con los parámetros de la ruta.
 * @param {Object} res - Objeto de respuesta HTTP.
 * 
 * Uso:
 * - `GET /detalle/:id` donde `:id` es el identificador único del vuelo.
 * 
 * Funcionalidad:
 * - Responde con la página HTML de detalles del vuelo.
 */
router.get('/detalle/:id', function (req, res) {

    res.sendFile(path.join(__dirname, '..', 'public', 'templates', 'vuelos', 'detalles.html'), (err) => {

        if (err) {
            res.status(err.status);
        } else {
            console.log('Encontrado correctamente');
        }
    });
});


/**
 * Ruta GET para obtener detalles de un vuelo específico.
 * 
 * @param {Object} req - Objeto de solicitud HTTP con los parámetros de la ruta.
 * @param {Object} res - Objeto de respuesta HTTP.
 * 
 * Uso:
 * - `GET /detalleVuelo/:id` donde `:id` es el identificador único del vuelo.
 * 
 * Funcionalidad:
 * - Consulta la base de datos para obtener detalles del vuelo con el identificador proporcionado.
 * - Responde con los detalles del vuelo en formato JSON.
 * - En caso de errores, responde con un mensaje de error o una indicación de que no hay datos.
 */
router.get('/detalleVuelo/:id', function (req, res) {
    let id = req.params.id;

    let query = "SELECT * FROM vuelos WHERE id = ?";

    connection.query(query, [id], function(err, row) {
        console.log(query);
        if(err){
            err.message
            res.status(500).send('Error: ' + err.message);
        }
        if(row == 'undefined'){
            res.status(200).send('No hay datos');
        }
        else{
            res.json(row);
        }
    });
});



/**
 * Ruta DELETE para eliminar un vuelo.
 * 
 * @param {Object} req - Objeto de solicitud HTTP con los parámetros de la ruta.
 * @param {Object} res - Objeto de respuesta HTTP.
 * 
 * Uso:
 * - `DELETE /eliminar/:id` donde `:id` es el identificador único del vuelo a eliminar.
 * 
 * Funcionalidad:
 * - Elimina de la base de datos el vuelo con el identificador proporcionado.
 * - Responde con información sobre el número de filas eliminadas.
 * - En caso de errores, puede lanzar una excepción o imprimir un mensaje en la consola.
 */
router.delete('/eliminar/:id', function (req, res) {
    let id = req.params.id;

    connection.query('DELETE FROM vuelos WHERE id = ?', [id], function (error, results, fields) {
    if (error) throw error;
        console.log('deleted ' + results.affectedRows + ' rows');
    });

});


/**
 * Ruta GET para obtener la página de edición de un vuelo.
 * 
 * @param {Object} req - Objeto de solicitud HTTP con los parámetros de la ruta.
 * @param {Object} res - Objeto de respuesta HTTP.
 * 
 * Uso:
 * - `GET /editar/:id` donde `:id` es el identificador único del vuelo a editar.
 * 
 * Funcionalidad:
 * - Retorna la página HTML de edición de un vuelo.
 * - En caso de errores, puede lanzar una excepción o imprimir un mensaje en la consola.
 */
router.get('/editar/:id', function (req, res) {

    res.sendFile(path.join(__dirname, '..', 'public', 'templates', 'vuelos', 'editar.html'), (err) => {

        if (err) {
            res.status(err.status);
        } else {
            console.log('Encontrado correctamente');
        }
    });
});


/**
 * Ruta PUT para actualizar la información de un vuelo.
 * 
 * @param {Object} req - Objeto de solicitud HTTP con los parámetros de la ruta y datos del cuerpo.
 * @param {Object} res - Objeto de respuesta HTTP.
 * 
 * Uso:
 * - `PUT /actualizar/:id` donde `:id` es el identificador único del vuelo a actualizar.
 * 
 * Parámetros en el cuerpo de la solicitud (formato JSON):
 * - `aerolinea` (string): Nueva aerolínea del vuelo.
 * - `destino` (string): Nuevo destino del vuelo.
 * - `origen` (string): Nuevo origen del vuelo.
 * - `fecha_llegada` (string): Nueva fecha de llegada del vuelo.
 * - `hora_llegada` (string): Nueva hora de llegada del vuelo.
 * - `fecha_salida` (string): Nueva fecha de salida del vuelo.
 * - `hora_salida` (string): Nueva hora de salida del vuelo.
 * 
 * Funcionalidad:
 * - Actualiza la información del vuelo en la base de datos.
 * - Retorna un objeto JSON indicando el estado de la actualización.
 *   - `{ estado: true }` si la actualización fue exitosa.
 *   - En caso de errores, puede retornar un código de estado HTTP 500 y un mensaje de error.
 */
router.put('/actualizar/:id', (req, res) => {
    let id = req.params.id;

    connection.query(
        'UPDATE vuelos SET aerolinea = ?, destino = ?, origen = ?, fecha_llegada = ?, hora_llegada = ?, fecha_salida = ?, hora_salida = ? WHERE id = ?',
        [
            req.body.aerolinea,
            req.body.destino,
            req.body.origen,
            req.body.fecha_llegada,
            req.body.hora_llegada,
            req.body.fecha_salida,
            req.body.hora_salida,
            req.params.id 
        ],
        function (error, results, fields) {
            if(error){
                res.status(500).send('Error: ' + error.message);
            }else{
                // Envio una respuesta si se ha realizado una sentencia UPDATE correcta
                res.json({estado : true});
            }
        }
    );
});

/**
 * Ruta GET para acceder al formulario de creación de vuelo.
 * 
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 * 
 * Uso:
 * - `GET /crear`
 * 
 * Funcionalidad:
 * - Devuelve el formulario HTML para la creación de un nuevo vuelo.
 * - El formulario incluye campos para el número de vuelo, aerolínea, destino, origen, fecha de salida, hora de salida, fecha de llegada y hora de llegada.
 */
router.get('/crear', function (req, res) {

    res.sendFile(path.join(__dirname, '..', 'public', 'templates', 'vuelos', 'crear.html'), (err) => {

        if (err) {
            res.status(err.status);
        } else {
            console.log('Encontrado correctamente');
        }
    });
});

/**
 * Ruta POST para la creación de un nuevo vuelo.
 * 
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 * 
 * Uso:
 * - `POST /vueloCrear`
 * 
 * Parámetros en el cuerpo de la solicitud (en formato JSON):
 * - `numero_vuelo` (String): Número de vuelo.
 * - `aerolinea` (String): Nombre de la aerolínea.
 * - `destino` (String): Destino del vuelo.
 * - `origen` (String): Origen del vuelo.
 * - `fecha_llegada` (String): Fecha de llegada del vuelo (en formato YYYY-MM-DD).
 * - `hora_llegada` (String): Hora de llegada del vuelo (en formato HH:mm).
 * - `fecha_salida` (String): Fecha de salida del vuelo (en formato YYYY-MM-DD).
 * - `hora_salida` (String): Hora de salida del vuelo (en formato HH:mm).
 * 
 * Funcionalidad:
 * - Inserta un nuevo vuelo en la base de datos con los datos proporcionados.
 * - Redirige a la página de índice de vuelos (`/vuelos/index`) después de la creación exitosa.
 */
router.post('/vueloCrear', (req, res) => {
    connection.query(
        'INSERT INTO vuelos SET numero_vuelo = ?, aerolinea = ?, destino = ?, origen = ?, fecha_llegada = ?, hora_llegada = ?, fecha_salida = ?, hora_salida = ?',
        [
            req.body.numero_vuelo,
            req.body.aerolinea,
            req.body.destino,
            req.body.origen,
            req.body.fecha_llegada,
            req.body.hora_llegada,
            req.body.fecha_salida,
            req.body.hora_salida,
        ],
        function (error, results, fields) {
            if (error) throw error;
            console.log(results.insertId);
            res.redirect(301, '/vuelos/index'); 
        }
    );
});

/**
 *Exporta el objeto 'router' para que las rutas y operaciones definidas en este módulo puedan ser utilizadas por otros archivos en la aplicación. 
 */ 
module.exports = router;