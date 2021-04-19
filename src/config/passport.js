const passport = require('passport');   
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

//configuramos el modulo de passport (el que mantendrá el login entre las diferentes vistas)
passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
},async function(email, password, done){

    //comprobamos que el email coincide con laguno registrado en la base de datos
    const user = await User.findOne({email});
    if (!user) {
        return done(null, false, {message: 'User not found'})
    }else {
        //si existe el email, validamos la contraseña
        const match = await user.matchPassword(password);
        if (match) {
            return done(null,user);
        } else {
            return done(null, false, {message: 'wrong password'})
        }

    }

}));

//esta es la configuracion del modulo passport que permite mantener el login entre las diferentes vistas de la pagina
//de manera que se sigue navegando logeado (si el ususario tiene permisos).
passport.serializeUser((user,done) => {
    done(null, user.id);
});

//en esta configuracion buscamos los datos del ususario a trave´s de la id en la base de datos
// si está, se devuelven esos datos de user y puede seguir 
passport.deserializeUser((id,done) => {
    User.findById(id, (err, user) => {
        done(err,user);
    })
});