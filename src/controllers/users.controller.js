const usersCtrl = {};

const passport = require('passport');

const User = require('../models/user');

usersCtrl.renderSignUpForm = (req,res) => {
    res.render('users/signup');
};

usersCtrl.signup = async (req,res) => {
    const errors = []
    const {name, email, password, confirm_password} = req.body;
    if (password != confirm_password){
        errors.push({text: 'Passwords do not match'});
    }
    if (password.length < 4){
        errors.push({text: 'Passwords must have 4 characters at least'});
    }
    if (errors.length > 0){
        res.render('users/signup', {
            errors,
            name, //esto es para que si hay un error de datos en el formulario se le devuelva al usuario ciertos campos
            email //y no tenga que rellenar todo otra vez
        })
    } else {
        const emailUser = await User.findOne({email:email});
        if (emailUser) {
            req.flash('error_msg', 'Email already in use');
            res.redirect('/users/signup');
        } else {
            const newUser = new User({name:name, email:email, password: password});
            newUser.password = await newUser.encryptPassword(password);
            await newUser.save();
            req.flash('success_msg', 'Register successfull');
            res.redirect('/users/signin');
        }
    }
};

usersCtrl.renderSigninForm = (req,res) => {
    res.render('users/signin');
};

// usersCtrl.signin = (req,res) => {
//     res.send('sign in');
// };
// Vamos a gestionar esta ruta con el modulo passport y su autenticaión

usersCtrl.signin = passport.authenticate('local', {
    failureRedirect: '/users/signin',
    successRedirect: '/notes',
    failureFlash: true
});
//configuramos la gestión de la redireccion según sea la comprobación exitosa o no
//tambien gestionamos el mensaje de error con flash declarando una nueva variable global de error
//y sacamos su mensaje con el partial de errors adamtandolo a este caso 

usersCtrl.logout = (req,res) => {
    req.logout(); //funcion de passport que se encarga de cerrar sesión
    req.flash('success_msg', 'Logout successfull');
    res.redirect('/users/signin');
};


module.exports = usersCtrl;