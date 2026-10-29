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
 * /api/coches/buscar/{id}:
 *   get:
 *     summary: Obtener un coche por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID del coche
 *     responses:
 *       200:
 *         description: Coche encontrado
 *       404:
 *         description: Coche no encontrado
 */
ruta.get("/buscar/:id", cocheController.findById);

ruta.get("/cargainicial", cocheController.cargaInicial)

ruta.get("/precio-mayor/:precio", cocheController.findByPrecioGreaterThan)

ruta.get("/buscar-por-marca/:marca", cocheController.findByMarca)


/**
 * @swagger
 * /api/coches:
 *   post:
 *     summary: Crear un coche
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               marca:
 *                 type: string
 *               modelo:
 *                 type: string
 *               anio:
 *                 type: number
 *     responses:
 *       201:
 *         description: Coche creado
 *       401:
 *         description: No autenticado
 *       403:
 *         description: No autorizado
 */
ruta.post("/",
    authMiddleware.soloAdmin, 
    authMiddleware.verificarToken,
    cocheController.insertOne)
ruta.put("/:id", cocheController.updateOne)
ruta.delete("/:id", cocheController.deleteOne)

module.exports = ruta