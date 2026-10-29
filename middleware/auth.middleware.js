// const jwt = require("jsonwebtoken");



// const permitirRoles = (...rolesPermitidos) => {

//     return (req, res, next) => {

//         const authHeader = req.headers.authorization;
//         const token = authHeader.split(" ")[1];


//         const currentUser = jwt.verify(token, "token")
//         console.log(currentUser);

//         if (!rolesPermitidos.includes(currentUser.rol)) {
//             return res.status(403).json({ mensaje: "no tienes permisos, pana" })
//         }

//         next();

//     }


// }

// const esPropietario = (...rolesPermitidos) => {

//     return (req, res, next) => {
    
    
//         const authHeader = req.headers.authorization;
//         const token = authHeader.split(" ")[1];
//         const currentUser = jwt.verify(token, "token")
    
//         if ((currentUser.id !== req.params.id) && !rolesPermitidos(currentUser.rol)) {
    
//             return res.status(403).json({
//                 mensaje: "No puedes modificar otro usuario"
//             });
//         }
    
//         next();
    
//     }
// }

// // const verificarToken = (req, res, next) => {

// //     const authHeader = req.headers.authorization;

// //     console.log(authHeader);

// //     //Seleccionamos el token con un split
// //     const token = authHeader.split(" ")[1];

// //     console.log(token);


// //     next();
// // }


// const verificarToken = (req, res, next) => {

//     const authHeader = req.headers.authorization;

//     if (!authHeader) {
//         return res.status(401).json({
//             mensaje: "Token necesario"
//         });
//     }

//     const token = authHeader.split(" ")[1];

//     try {

//         const datos = jwt.verify(
//             token,
//             "token"
//         );



//         // if (datos.id != req.params.id) {
//         //     // 403 = sin permiso
//         //     return res.status(403).json({
//         //         mensaje: "Acceso no permitido"
//         //     });
//         // }

//         console.log(datos);

//         next();

//     } catch (error) {

//         return res.status(401).json({
//             mensaje: "Token no válido"
//         });

//     }
// }

// const soloAdmin = (req, res, next) => {
//     const authHeader = req.headers.authorization;
//     const token = authHeader.split(" ")[1];

//     if (!authHeader || !token) {
//         return res.status(401).json({
//             mensaje: "Token no válido"
//         });
//     }


//     if (req.usuario.rol !== "ADMON") {

//         return res.status(403).json({
//             mensaje: "No tienes permisos"
//         });
//     }


//     next();
// }

// const puedeVerVentas = (req, res, next) => {

//     // if (
//     //     req.usuario.rol !== "DIRECTOR" &&
//     //     req.usuario.rol !== "ADMON"
//     // ) {

//     //     return res.status(403).json({
//     //         mensaje: "No tienes permisos"
//     //     });
//     // }

//     // next();

//     const authHeader = req.headers.authorization;
//     const token = authHeader.split(" ")[1];


//     const currentUser = jwt.verify(token, "token")
//     console.log(currentUser);


//     const rolesPermitidos = [
//         "DIRECTOR",
//         "ADMON"
//     ];

//     if (!rolesPermitidos.includes(currentUser.rol)) {

//         return res.status(403).json({
//             mensaje: "No tienes permisos"
//         });
//     }

//     next();


// }

// module.exports = {
//     verificarToken,
//     soloAdmin,
//     puedeVerVentas,
//     permitirRoles,
//     esPropietario
// };


const jwt = require("jsonwebtoken");


// 1. COMPROBAR TOKEN
const verificarToken = (req, res, next) => {

    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({
            mensaje: "Token necesario"
        });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({
            mensaje: "Token necesario"
        });
    }

    try {

        const datos = jwt.verify(token, process.env.TOKEN);

        // IMPORTANTE
        req.usuario = datos;

        next();

    } catch (error) {

        return res.status(401).json({
            mensaje: "Token no válido"
        });
    }
}


// 2. COMPROBAR ROLES
const permitirRoles = (...rolesPermitidos) => {

    return (req, res, next) => {

        
        if (!rolesPermitidos.includes(req.cualquiercosa.rol)) {

            return res.status(403).json({
                mensaje: "No tienes permisos, pana"
            });
        }

        next();
    }
}


// 3. COMPROBAR PROPIETARIO O ADMIN
const esPropietario = (req, res, next) => {

    const esSuCuenta =
        req.usuario.id === req.params.id;

    const esAdmin =
        req.usuario.rol === "ADMON";

    if (!esSuCuenta && !esAdmin) {

        return res.status(403).json({
            mensaje: "No puedes modificar otro usuario"
        });
    }

    next();
}


// 4. OPCIONAL: SOLO ADMIN
const soloAdmin = (req, res, next) => {

    if (req.usuario.rol !== "ADMON") {

        return res.status(403).json({
            mensaje: "No tienes permisos"
        });
    }

    next();
}


// 5. OPCIONAL: DIRECTOR O ADMIN
const puedeVerVentas = (req, res, next) => {

    const rolesPermitidos = [
        "DIRECTOR",
        "ADMON"
    ];

    if (!rolesPermitidos.includes(req.usuario.rol)) {

        return res.status(403).json({
            mensaje: "No tienes permisos"
        });
    }

    next();
}


module.exports = {
    verificarToken,
    soloAdmin,
    puedeVerVentas,
    permitirRoles,
    esPropietario
};