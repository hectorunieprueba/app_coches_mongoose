const express = require("express");
const ruta = express.Router();
const ventasController = require("../controller/ventas.controller");
const validarVenta = require("../middleware/validarVenta.middleware")
const authMiddleware = require("../middleware/auth.middleware")


//Búsquedas dinámicas (esto tiene que ir primero)
/**
 * @swagger
 * /api/ventas/getventasordenpaginacion:
 *   get:
 *     summary: Obtener ventas
 *     parameters:
 *       - in: query
 *         name: min
 *         schema:
 *           type: number
 *         description: Precio mínimo
 *
 *       - in: query
 *         name: max
 *         schema:
 *           type: number
 *         description: Precio máximo
 *     responses:
 *       200:
 *         description: Lista de ventas
 */
ruta.get("/getventasordenpaginacion", ventasController.getVentasOrdenadasPaginadas)

ruta.get("/getventas",authMiddleware.verificarToken, authMiddleware.permitirRoles("ADMON", "DIRECTOR"),  ventasController.getVentas)
ruta.get("/getventasorden", ventasController.getVentasOrdenadas)


// ruta.post("/", authMiddleware.verificarToken, authMiddleware.puedeVerVentas ,ventasController.registro)


ruta.post("/" ,ventasController.registro)
ruta.get("/todos", ventasController.getVentasSortByPrecio)
ruta.get("/range/:max/:min", ventasController.getVentasSortByRangePrecio)
ruta.get("/:id", ventasController.findById)



module.exports = ruta;