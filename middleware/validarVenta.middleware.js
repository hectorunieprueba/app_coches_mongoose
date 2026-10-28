const jwt = require('jsonwebtoken')

const validarVenta = (req, res, next) => {

    if (!req.body.idUsuario || !req.body.idCoche || !req.body.precio) {

        return res.status(400).json({
            mensaje: "Faltan datos obligatorios"
        });



    }

    if (req.body.precio <= 0) {

        return res.status(400).json({
            mensaje: "El precio debe ser mayor que 0"
        });

    }

    next();
}

const validarUsuario = (req,res,next) => {
    if (!req.body.username || !req.body.password) {
         return res.status(400).json({
            mensaje: "faltan cosas"
        });
    }

    next();

}

const verificarToken = (req,res,next) => {
    //IMPORTANTE!! ESTÁ EN EL HEADERS!!
     const authHeader = req.headers.authorization;
    //RECIBIMOS EL AUTH MEDIANTE HEADERS Y TENEMOS EL TOKEN!
    console.log(authHeader);

    next();
}


// Crea un middleware llamado validarCoche que se ejecute antes de registrar un coche.

// Debe comprobar que se han enviado marca, modelo y precio.

// Si falta alguno, debe responder con 400.

// Además, el precio no puede ser menor o igual que 0.

// Si todos los datos son correctos, debe permitir que la petición llegue al controller.

module.exports = {validarVenta, validarUsuario, verificarToken};