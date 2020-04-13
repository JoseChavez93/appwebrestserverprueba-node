const express = require('express')
const app = express()
const Usuario = require('../models/usuario')
const bcrypt = require('bcrypt');
const _ = require('underscore')

app.get('/usuario', (req, res) => {

    let desde = req.query.desde || 0;
    desde = Number(desde)
    let limite = req.query.limite || 5;
    limite = Number(limite)


    Usuario.find({ estado: true }, 'nombre email rol estado google img').skip(desde).limit(limite).exec((err, usuariosDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                error: err
            })
        }
        Usuario.count({ estado: true }, (err, conteo) => {
            res.json({
                ok: true,
                usuarios: usuariosDB,
                cantidad: conteo
            })
        })
    })
})

app.post('/usuario', (req, res) => {
    let body = req.body;
    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        rol: body.rol
    })

    usuario.save((err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                error: err
            })
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        })
    })
})

app.put('/usuario/:id', (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'email', 'img', 'rol', 'estado']);

    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                error: err
            })
        }
        res.json({
            ok: true,
            usuario: usuarioDB
        })
    })
})

app.delete('/usuario/:id', (req, res) => {
    let id = req.params.id;
    let cambiarEstado = {
        estado: false
    };

    //Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {
    Usuario.findByIdAndUpdate(id, cambiarEstado, { new: true }, (err, usuarioBorrado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                error: err
            })
        }
        if (!usuarioBorrado) {
            return res.status(400).json({
                ok: false,
                error: {
                    message: "Usuario no encontrado"
                }
            })
        }

        res.json({
            ok: true,
            usuario: usuarioBorrado
        })
    })
})


module.exports = app;

//usuario:giuzepe
//clave:Jw5JRKdjDCQ3ZiU7
//cadena de conexion: mongodb+srv://giuzepe:Jw5JRKdjDCQ3ZiU7@cluster0-e5ecg.mongodb.net/cafe