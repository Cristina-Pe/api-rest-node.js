const express = require('express');
const app = express();

//Documentacion Swagger

const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
    swaggerDefinition: {
        openapi: "3.0.o",
        info: {
            title: "Documentación API REST",
        },
        servers: [
            {
                url: "http://localhost:3000",
            },
        ],
    },
    apis: ['./src/rutas/*.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

//Configuración servidor

app.set('port', process.env.PORT || 3000);

//Rutas

app.use(require('./rutas/mascota'));

//Middlewares

app.use(express.json());

app.listen(app.get('port'), () => {
    console.log('Servidor en el puerto', app.get('port'));
});

//Manejo de errores

app.use(function (error, req, res, next) {

    res.status(500).json({
        status: 'error',
        message: error.message,
    });
});


module.exports = app;
