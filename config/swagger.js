const swaggerJsdoc = require("swagger-jsdoc");

const opciones = {

    definition: {

        openapi: "3.0.0",

        info: {
            title: "API Concesionario",
            version: "1.0.0",
            description: "API REST para gestionar coches, usuarios y ventas"
        },

        servers: [
            {
                url: "http://localhost:3000"
            }
        ]
    },

    apis: [
        "./routes/*.js"
    ]
};

const swaggerSpec = swaggerJsdoc(opciones);

module.exports = swaggerSpec;