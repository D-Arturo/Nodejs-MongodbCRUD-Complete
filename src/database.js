const mongoose = require('mongoose');

const NOTES_APP_MONGODB_HOST = process.env.NOTES_APP_MONGODB_HOST;
const NOTES_APP_MONGODB_DATABASE = process.env.NOTES_APP_MONGODB_DATABASE;
                    //llamada a utilizar la variable de entorno que definimos con la ruta de la DB
const MONGODB_URI = `mongodb://${NOTES_APP_MONGODB_HOST}/${NOTES_APP_MONGODB_DATABASE}`;

mongoose.connect(MONGODB_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
//promesas poderosas.  .then se ejecuta: si .connect funciona mostrará (db) si no mostrará (failure)   .catch recoge el error, si lo hubiese
    .then(db => console.log('Database connected'))
    .catch(err => console.log(err));

