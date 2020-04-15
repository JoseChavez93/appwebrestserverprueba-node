const express = require('express')
const app = express()

//Para hacer la encriptacion de una sola via
const bcrypt = require('bcrypt');
const Usuario = require('../models/usuario')
const { verificaToken, verificaAdmin_Rol } = require('../middlewares/autenticacion')
const _ = require('underscore')

app.get('/usuario', verificaToken, (req, res) => {

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

app.post('/usuario', [verificaToken, verificaAdmin_Rol], (req, res) => {
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

app.put('/usuario/:id', [verificaToken, verificaAdmin_Rol], (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'email', 'img', 'rol', 'estado']); //pick retorna una copia del objeto filtrando solo los valores que se necesite usar

    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioDB) => { //new:true para devolver el documento modificado en lugar del original. Por defecto es falso
        if (err) { //runValidators: ejecuta todas validaciones definidas en el esquema
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

app.delete('/usuario/:id', [verificaToken, verificaAdmin_Rol], (req, res) => {
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

//Para conectar a cluster0 desde Robo 3T a mongoDB atlas se necesita esta cadena de conexion
//mongodb+srv://giuzepe:Jw5JRKdjDCQ3ZiU7@cluster0-e5ecg.mongodb.net/cafe