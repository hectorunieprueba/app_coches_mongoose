const express = require("express");
const ruta = express.Router();
const ventasController = require("../controller/ventas.controller");
const validarVenta = require("../middleware/validarVenta.middleware")
const authMiddleware = require("../middleware/auth.middleware")


//Búsquedas dinámicas (esto tiene que ir primero)
ruta.get("/getventasordenpaginacion", ventasController.getVentasOrdenadasPaginadas)
ruta.get("/getventas",authMiddleware.verificarToken, authMiddleware.permitirRoles("ADMON", "DIRECTOR"),  ventasController.getVentas)
ruta.get("/getventasorden", ventasController.getVentasOrdenadas)


ruta.post("/", validarVenta.validarVenta, authMiddleware.puedeVerVentas ,ventasController.registro)
ruta.get("/todos", ventasController.getVentasSortByPrecio)
ruta.get("/range/:max/:min", ventasController.getVentasSortByRangePrecio)
ruta.get("/:id", ventasController.findById)



module.exports = ruta;