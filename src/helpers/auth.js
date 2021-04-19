const helpers = {};

helpers.isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) { //este es un metodo propio de passport para saber si el usuario esta logeado o no
        return next(); //si está logeado (true), que continue haciendo l oque sea (next), en caso contrario le mandará al formulario de logear
    }
    req.flash('error_msg', 'You are not authorized');
    res.redirect('/users/signin');
}

module.exports = helpers;