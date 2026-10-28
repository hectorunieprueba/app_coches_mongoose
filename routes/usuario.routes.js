const express = require("express");
const ruta = express.Router();
const usuarioController = require("../controller/usuarios.controller");
const validarToken = require("../middleware/auth.middleware")

ruta.get("/cargainicial", usuarioController.cargaInicial)
ruta.post("/login",  usuarioController.findByUsernameAndPassword)
ruta.get("/:id", usuarioController.findByUsernameAndPassword)
ruta.post("/signUp", usuarioController.signUp)
ruta.delete("/eliminar/:id" , validarToken.verificarToken, usuarioController.deleteUser)


module.exports = ruta;