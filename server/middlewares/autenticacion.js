const jwt = require('jsonwebtoken');

//=====================
//  VERIFICAR TOKEN
//=====================

let verificaToken = (req, res, next) => {

    let token = req.get('token')

    jwt.verify(token, process.env.SEED, (err, decoded) => {

        if (err) {
            return res.status(401).json({
                ok: false,
                error: {
                    message: 'Token no valido'
                }
            })
        }

        req.usuario = decoded.usuario;
        next();
    })

    // res.json({
    //     token: token
    // })
}



//========================
//  VERIFICA ADMIN-ROL
//========================

let verificaAdmin_Rol = (req, res, next) => {
    let usuario = req.usuario;
    if (usuario.rol === 'ADMIN_ROL') {
        next();
    } else {
        return res.json({
            ok: false,
            error: {
                message: 'El usuario no es administrador'
            }
        })
    }
}



module.exports = {
    verificaToken,
    verificaAdmin_Rol
}



//token:eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvIjp7InJvbCI6IkFETUlOX1JPTCIsImVzdGFkbyI6dHJ1ZSwiZ29vZ2xlIjpmYWxzZSwiX2lkIjoiNWU5MmE5ZWNmYThiNGUzZTk0ZTkzMzYyIiwibm9tYnJlIjoiSm9zZSIsImVtYWlsIjoiam9hbi5kZXY5M0BnbWFpbC5jb20iLCJfX3YiOjB9LCJpYXQiOjE1ODY5MjY2NjEsImV4cCI6MTU4NjkyOTI1M30.JNvtBnl8nIHVItqRad_ZfVZzqlcX3dMC9sHiMwg87Yk