const express = require('express');
//const mongoose = require('mongoose');
const coches = require('../bbdd/coches')
const Coche = require('../model/coche.model');


const cargaInicial = async (req, res) => {
    await Coche.insertMany(coches);
    //201 es por la creación
    return res.status(201).send("carga Completada!")
}

const findAll = async (req, res) => {
    const result = await Coche.find();
    return res.status(200).send(result);
}

const findById = async (req, res) => {
    const result = await Coche.find({_id: req.params.id});
    return res.status(200).send(result);
}


const findByPrecioGreaterThan = async (req, res) => {
    const precio = Number(req.params.precio);
    const result = await Coche.find({
        precio: { $gt: precio }
    });

    console.log(result.length);
    
    if (result.length == 0) {
        //No se ha encontrado coches (puedo poner un 204 pero no devuelve nada)
        return res.status(404).send("No hay ningún coche con los parámetros introducidos");
        
    }else{
        return res.status(200).send(result);
    }
}

const findByMarca = async (req, res) => {
    const result = await Coche.find({marca: req.params.marca})
    return res.status(200).send(result);
}

const insertOne = async (req,res) => {
    try {
        //Se le pasará un json por el body
        const coche = req.body;
        const cocheNuevo = new Coche(coche);
        const result = await cocheNuevo.save();
        return res.status(201).send(result);

    } catch (err) {
        console.err("Error en el insert de un coche", err);
        return res.status(500).json({mensaje: "Error interno"})
    }
}

const updateOne = async (req, res) => {
    
    try {
        //runValidators para ver si las restricciones de mongoose se cumplen
        const result = await Coche.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true}) ;
        if (!result) {
            return res.status(404).send("coche no encontrado")
        }
        return res.status(200).send(result);
    } catch (error) {
        console.error("Error en el update de un coche", err);
        return res.status(500).json({mensaje: "Error interno"})
    }
}

const deleteOne = async (req, res) => {
    
    try {
        const result = await Coche.findByIdAndDelete(req.params.id);
        
        if (!result) {
            return res.status(404).json({mensaje: "coche no encontrado"} )
            
        }

        return res.status(200).json({mensaje: "coche eliminado"})
        

    } catch (error) {
         console.error("Error en el update de un coche", err);
        return res.status(500).json({mensaje: "Error interno"})
    }

}

// Método	Para qué	Ejemplo
// POST	Crear	Crear un Seat Ibiza
// PUT	Reemplazar/actualizar completamente	Actualizar todos los datos del Ibiza
// PATCH	Actualizar parcialmente	Cambiar solo el precio
// DELETE	Eliminar	Borrar el Ibiza
// GET	Consultar	Obtener el Ibiza

module.exports = {
    cargaInicial,
    findAll,
    findByPrecioGreaterThan,
    findByMarca, 
    insertOne,
    findById,
    updateOne,
    deleteOne
}

