//Peticiones > CRUD

const express = require('express');
const router = express.Router();
const validations = require('../validations');
const mysqlConnection = require('../database');
const app = require('..');
const jwt = require("jsonwebtoken");

/**
 * @swagger
 * components:
 *   schemas:
 *     Mascota: 
 *          type: object
 *          required:
 *          - nombre
 *          - especie
 *          - genero
 *          - edad
 *          - fec_nac
 *          properties:
 *              id:
 *                  type: integer
 *                  description: Autogenerado
 *              nombre:
 *                  type: string
 *                  description: nombre del animal
 *              especie:
 *                  type: string
 *                  description: especie del animal
 *              genero:
 *                  type: string
 *                  description: Masculino o femenino
 *              edad:
 *                  type: integer
 *                  description: edad del animal
 *              fec_nac:
 *                  type: string
 *                  description: Fecha de nacimiento del animal
 *          example:
 *              id: 12
 *              nombre: perro
 *              especie: mamifero
 *              genero: M
 *              edad: 2
 *              fec_nac: 26/02/2019
 */

//Prueba para despliegue
 router.get('/pruebaDespliegue', (req, res) => {
     res.send('Holaaa la aplicación funciona :)')
});
/**
 * @swagger
 * /lismascotas:
 *   get:
 *     summary: Devuelve el listado completo de mascotas
 *     tags: [Mascotas]
 *     responses:
 *       200:
 *         description: Devuelto con éxito
 *       404:
 *         description: No encontrado
 */
router.get('/lismascotas', (req, res) => {
    mysqlConnection.query('SELECT * FROM mascota', (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
    });
});

/**
 * @swagger
 * /kpidemascotas:
 *   get:
 *     summary: Devuelve la especie más numerosa y el número de unidades.
 *     tags: [Mascotas]
 *     responses:
 *       200:
 *         description: Devuelto con éxito
 *       404:
 *         description: No encontrado
 */

router.get('/kpidemascotas', (req, res) => {
    mysqlConnection.query('SELECT especie, COUNT( especie ) AS total FROM  mascota GROUP BY especie ORDER BY total DESC LIMIT 1', (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
    });

});

/**
 * @swagger
 * /kpidemascotas/{especie}:
 *   get:
 *     summary: Devuelve la edad promedio de las mascotas de una especie determinada asi como la desviación estándar entre las edades de las mascotas de esa especie.
 *     tags: [Mascotas]
 *     parameters:
 *      - in: path
 *        name: especie
 *        schema:
 *          type: string
 *        required: true
 *        description: Especie de la mascota
 *     responses:
 *       200:
 *         description: Devuelto con éxito
 *       404:
 *         description: La especie no fue encontrada
 */

router.get('/kpidemascotas/:especie', (req, res) => {

    const { especie } = req.params;

    mysqlConnection.query('SELECT AVG( edad ) as promedio, std(edad) as desviacion FROM  mascota where especie = ? group by especie', [especie], (err, rows, fields) => {
        if (!err) {
            res.json(rows[0]);
        } else {
            console.log(err);
        }
    });

});

//Login/token

router.post('/login', (req, res) => {
    const user = {
        id: 1,
        nombre: "Cristina",
        email: "cristina@email"
    }

    jwt.sign({ user: user }, 'Key', { expiresIn: '1h' }, (err, token) => {
        res.json({
            token: token
        })
    });
});

/**
 * @swagger
 * /creamascota:
 *   post:
 *     summary: Añade una mascota a la lista
 *     tags: [Mascotas]
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *     responses:
 *       200:
 *         description: Mascota añadida con éxito
 *       500:
 *         description: Ocurrió un error
 */

router.post('/creamascota', verifyToken, (req, res) => {
    jwt.verify(req.token, 'Key', (err, authData) => {
        if (err) {
            res.sendStatus(403);

        } else {
            validations.crearMascotasValidation(req.body);
            const { id, nombre, especie, genero, edad, fec_nac } = req.body;
            const query = `CALL Addmascota(?, ?,?, ?,?,?);`;

            mysqlConnection.query(query, [id, nombre, especie, genero, edad, fec_nac], (err, rows, fields) => {
                if (!err) {
                    res.json({
                        Status: 'Ok',
                        message: 'Mascota creada',
                    });
                } else {
                    console.log(err);
                }
            });

        }
    });

});

// Authorization: Bearer <token>
function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];

    if (typeof bearerHeader !== 'undefined') {
        const bearerToken = bearerHeader.split(" ")[1];
        req.token = bearerToken;
        next();
    } else {
        res.sendStatus(403);
    }
}
module.exports = router;