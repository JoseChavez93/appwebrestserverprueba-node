//===================
//  PUERTO
//===================
process.env.PORT = process.env.PORT || 3000

//===================
//  ENTORNO
//===================

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

//==========================
//  VENCIMIENTO DEL TOKEN
//==========================

process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;


//====================================
//  SEED O SEMILLA DE AUTENTICACION
//====================================

process.env.SEED = process.env.SEED || 'Este-es-el-seed-desarrollo'


//===================
//  BASE DE DATOS
//===================

let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = "mongodb://localhost:27017/cafe";
} else {
    urlDB = process.env.MONGO_URI;
}

//urlDB = "mongodb+srv://giuzepe:Jw5JRKdjDCQ3ZiU7@cluster0-e5ecg.mongodb.net/cafe?retryWrites=true&w=majority";

process.env.URLDB = urlDB;

//mongodb://localhost:27017/cafe
//mongodb+srv://giuzepe:Jw5JRKdjDCQ3ZiU7@cluster0-e5ecg.mongodb.net/cafe?retryWrites=true&w=majority