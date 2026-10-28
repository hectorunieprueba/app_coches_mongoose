const express = require("express");
const ruta = express.Router();
const cocheController = require("../controller/coches.controller")
const authMiddleware = require("../middleware/auth.middleware")

//Todos
/**
 * @swagger
 * /api/coches:
 *   get:
 *     summary: Obtener todos los coches
 *     responses:
 *       200:
 *         description: Lista de coches
 */
ruta.get("/", cocheController.findAll)


/**
 * @swagger
 * /api/coches/:id:
 *   get:
 *     summary: Obtener coches por id
 *     responses:
 *       200:
 *         description: Obtener un coche
 */
ruta.get("/buscar/:id", cocheController.findById);

ruta.get("/cargainicial", cocheController.cargaInicial)

ruta.get("/precio-mayor/:precio", cocheController.findByPrecioGreaterThan)

ruta.get("/buscar-por-marca/:marca", cocheController.findByMarca)


/**
 * @swagger
 * /api/coches:
 *   post:
 *     summary: Insertar un coche en base de datos
 *     responses:
 *       200:
 *         description: Insertar un coche
 */

ruta.post("/",
    authMiddleware.soloAdmin, 
    authMiddleware.verificarToken,
    cocheController.insertOne)
ruta.put("/:id", cocheController.updateOne)
ruta.delete("/:id", cocheController.deleteOne)

module.exports = ruta