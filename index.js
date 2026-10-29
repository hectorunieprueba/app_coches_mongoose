const express = require('express');
const app = express();
const mongoose = require('mongoose');
const logger = require('./middleware/logger.middleware')


//variables de entorno:
require("dotenv").config();



//bodyparser para parsear datos (explicar a partir del primer post)
const bodyparser = require("body-parser")

const rutaCoches = require("./routes/coche.routes")
const rutaUsuarios = require("./routes/usuario.routes")
const rutaVentas = require("./routes/venta.routes")


//express-validator


//swagger 

const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))



//middlewares
app.use(express.json())
app.use(bodyparser.urlencoded({extended:true}))
app.use("/api/coches", rutaCoches);
app.use("/api/usuarios", rutaUsuarios);
app.use("/api/ventas", rutaVentas);




//clase de middlewares
app.use(logger);

const port = process.env.PORT || 3000

mongoose.connect(process.env.MONGODB_URI_LOCAL)
.then(() => console.log('BBDD en marcha!'))
.catch((error) => {console.log('Cagadón mesopotámico'); console.error(error)})


app.listen(port, () => console.log(`Proyecto arrancado en el puerto ${port}`))