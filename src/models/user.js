const {Schema, model} = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new Schema({
    name: { type: String, required: true},
    email: { type: String, required: true, unique: true},
    password: { type: String, require: true}
}, {
    timestamps: true
})

//aqui estamos ceando un metodo para el Schema (methods es una propiedad de mongoose para crear estos metodos) que nos permita encriptar
//las contraseñas para luego guardarlas en la base de datos
//Esto es posible utilizando el modulo bcrypt
UserSchema.methods.encryptPassword = async password => {
   const salt = await bcrypt.genSalt(10); //"rondas" que tomará el algoritmo de encriptado 
   return await bcrypt.hash(password, salt); //asociamos la contraseña al valor encriptado
   //retornamos la contraseña cifrada. 
};

//aqui vamos a crear un metodo para comparar una constraseña que se ingresa si coincide con la registrada en la base de datos.
// introducir contraseña - encriptar - comparar con la contraseña encriptada de la base de datos
UserSchema.methods.matchPassword = async function(password) { //declaramos la funcion mormal para poder utilizar .this
    return await bcrypt.compare(password, this.password)
}

module.exports = model('User', UserSchema);