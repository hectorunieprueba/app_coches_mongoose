const express = require('express');
const ruta = express.Router()
const Usuario = require('../model/usuario.model');
const Coche = require("../model/coche.model")
const Venta = require("../model/venta.model")


class VentaController {

    async registro(req, res) {
        const usuarioVenta = await Usuario.findById(req.body.idUsuario);
        if (!usuarioVenta) {
            return res.status(404).send("usuario no existe");
        }

        const cocheVenta = await Coche.findById(req.body.idCoche);
        if (!cocheVenta) {
            return res.status(404).send("Coche no existe");
        }

        const ventaNueva = new Venta({
            usuario: {
                _id: usuarioVenta._id
            },
            coche: {
                _id: cocheVenta._id
            },
            precio: req.body.precio
        })

        const resultVenta = await ventaNueva.save();

        cocheVenta.isVendido = true;

        await cocheVenta.save();
        return res.status(201).json({ "mensaje": "Venta realizada con éxito", "datos": resultVenta });

    }

    async findById(req, res) {

        let venta = await Venta.findById(req.params.id).populate('usuario', "nombre email").populate("coche", "marca modelo");

        if (!venta) {
            return res.status(404).json({ mensaje: "no encontrada venta con ese id" })
        }
        return res.status(200).send(venta);
    }

    async getVentasSortByPrecio(req, res) {
        const result = await Venta.find().sort({ precio: 1 });
        return res.status(200).send(result);
    }


    async getVentasSortByRangePrecio(req, res) {
        const result = await Venta.find({ precio: { $gt: req.params.min, $lt: req.params.max } }).sort({ precio: 1 });
        return res.status(200).send(result);
    }

    //A PARTIR DE AQUÍ BÚSQUEDAS DINÁMICAS
    //PARA FILTROS OPCIONALES MEJOR USAR QUERY PARAMETERS

    // async getVentas(req, res) {
    //PRIMERO HAGO ESTO, DESPUÉS EXPLICO LO OTRO
    //     let filtro = {};

    //     if (req.query.min && req.query.max) {
    //         filtro.precio = {
    //             $gt: Number(req.query.min),
    //             $lt: Number(req.query.max)
    //         };
    //     }

    //     const result = await Venta.find(filtro);

    //     return res.status(200).send(result);
    // }

    async getVentas(req, res) {
        console.log(req.query);

        let filtro = {};
        let filtroPrecio = {};

        if (req.query.min) {
            filtroPrecio.$gt = Number(req.query.min);
        }

        if (req.query.max) {
            filtroPrecio.$lt = Number(req.query.max);
        }

        if (req.query.min || req.query.max) {
            filtro.precio = filtroPrecio
        }

        const result = await Venta.find(filtro)

        return res.status(200).send(result);
    }

     async getVentasOrdenadas(req, res) {
       

        let filtro = {};
        let filtroPrecio = {};

        if (req.query.min) {
            filtroPrecio.$gt = Number(req.query.min);
        }

        if (req.query.max) {
            filtroPrecio.$lt = Number(req.query.max);
        }

        if (req.query.min || req.query.max) {
            filtro.precio = filtroPrecio
        }


         let orden = 1;

        if(req.query.orden === "desc"){
            orden = -1
        }


        const result = await Venta.find(filtro).sort({precio: orden})

        return res.status(200).send(result);
    }

    //paginación

     async getVentasOrdenadasPaginadas(req, res) {
       

        let filtro = {};
        let filtroPrecio = {};

        if (req.query.min) {
            filtroPrecio.$gt = Number(req.query.min);
        }

        if (req.query.max) {
            filtroPrecio.$lt = Number(req.query.max);
        }

        if (req.query.min || req.query.max) {
            filtro.precio = filtroPrecio
        }


         let orden = 1;

        if(req.query.orden === "desc"){
            orden = -1
        }

        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const result = await Venta.find(filtro).sort({precio: orden}).skip(skip).limit(limit)

        return res.status(200).send(result);
    }


// GET /api/ventas

// GET /api/ventas?min=10000

// GET /api/ventas?max=30000

// GET /api/ventas?min=10000&max=30000

// GET /api/ventas?orden=desc

// GET /api/ventas?page=2&limit=5

// GET /api/ventas?min=10000&max=30000&orden=desc&page=2&limit=5

// Modifica el endpoint de coches para que GET /api/coches permita utilizar los siguientes query params opcionales:

// marca: filtrar por marca.
// min: año mínimo.
// max: año máximo.
// orden: ordenar por año (asc o desc).
// page: página que queremos consultar.
// limit: número de coches por página.

// Diferencia: query params son opcionales. para filtros mejro query
//También es escalable los query, con params tendríamos una ruta larga:
// /ventas/precio/10000/30000/usuario/123/orden/desc/pagina/2/limite/10
// /ventas?min=10000&max=30000&usuario=123&orden=desc&page=2&limit=10
}
module.exports = new VentaController();
