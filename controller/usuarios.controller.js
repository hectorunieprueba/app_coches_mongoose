const express = require('express');
const usuarios = require('../bbdd/usuarios')
const Usuario = require('../model/usuario.model');
const bcrypt = require('bcrypt')
// npm i jsonwebtoken
const jwt = require('jsonwebtoken');

class UsuarioController {

    async cargaInicial(req, res) {
        await Usuario.insertMany(usuarios);
        return res.status(201).send("carga de usuarios Completada!")
    }

    async findById(req, res) {
        const usuario = await Usuario.findById(req.params.id);
        return res.status(200).send(usuario);
    }

    async findByUsernameAndPassword(req, res) {

        try {
            const user = await Usuario.findOne({ username: req.body.username }).select("+password");


            const passwordDesencriptado = user ? await bcrypt.compare(req.body.password, user.password) : false;

            
            
            //const result = await Usuario.findOne({username: req.body.username, password: passwordDesencriptado});
            
            if (!passwordDesencriptado || !user) {
                return res.status(404).send({ message: "usuario no encontrado" })
            }
            
            
            
            //generamos un token
            const token = jwt.sign(
                {
                    id: user._id,
                    username: user.username,
                    rol: user.rol
                },
                //Ese String es la clave secreta con la que firmas el JWT.
                process.env.TOKEN,
                {
                    expiresIn: "1h"
                }
            )
            
            console.log("Login correcto, generando token...");
            return res.status(200).send({ "mensaje": "Credenciales correctas", "token": token });
        } catch (error) {
            return res.status(500).json({ "mensaje": "Fallo al enviar" });

        }
    }
    // async findByUsernameAndPassword(req, res) {
    //     const result = await Usuario.findOne({username: req.body.username, password: req.body.password});
    //     if (!result) {
    //         return res.status(404).send({message: "usuario no encontrado"})
    //     }
    //     return res.status(200).send(result);
    // }

    //  async signUp(req, res) {
    //    try {
    //     const usuario = new Usuario({
    //         username: req.body.username,
    //         password: req.body.password,
    //         nombre: req.body.nombre,
    //         email: req.body.email,
    //         rol: req.body.rol
    //     });

    //     const result = await usuario.save();

    //     return res.status(201).send(result);

    // } catch (error) {
    //     console.error("Error al registrar usuario", error);

    //     return res.status(500).json({
    //         message: "Error interno"
    //     });
    // }

    // }


    async signUp(req, res) {
        try {

            const passwordEncriptado = await bcrypt.hash(req.body.password, 8);


            const usuario = new Usuario({
                username: req.body.username,
                password: passwordEncriptado,
                nombre: req.body.nombre,
                email: req.body.email,
                rol: req.body.rol
            });

            const result = await usuario.save();

            return res.status(201).send(result);

        } catch (error) {
            console.error("Error al registrar usuario", error);

            return res.status(500).json({
                message: "Error interno"
            });
        }

    }

    async deleteUser(req, res) {
        try {
            const result = await Usuario.findByIdAndDelete(req.params.id)


            if (!result) {
                return res.status(404).json({
                    message: "Usuario no encontrado"
                });
            }
            return res.status(200).send("Usuario eliminado")

        } catch (error) {
            console.error("Error al eliminar usuario", error);

            return res.status(500).json({
                message: "Error interno"
            });
        }
    }
    //findbyIDAndPassword - logIn
    //signUp
}


module.exports = new UsuarioController();