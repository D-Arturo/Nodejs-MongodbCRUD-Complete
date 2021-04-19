const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');
const handlebars = require('handlebars');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');



//Inicializaciones
const app = express();
require('./config/passport');

//CONFIGURACIONES: lo que queremos que haga Express, basado en ciertos modulos
    
app.set('port', process.env.PORT || 4000);
    //Nos fijamos un vlaor determinado para el número de puerto. Le asociamos la variable global PORT que puede estar contemplada
    //en el sistema operativo y que la ultilice. Si no es el caso, sí le damos un valor concreto (4000)
app.set('views', path.join(__dirname, 'views'));
    //__dirname nos da la direccion(ruta) de donde se encuentra el archivo donde se escribe (server.js en este caso) de manera que 
    // a partir de ahí podemos referenciar la ruta correspondiente a la carpeta views. El modulo path es el que concatenará la ruta completa
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    handlebars: handlebars
}));
app.set('view engine', '.hbs');


//MIDDLEWARES: Funciones que se van ejecutando a medida que llegan peticiones
app.use(morgan('dev'));
//configuramos cómo queremos que morgan muestre su output. https://www.npmjs.com/package/morgan

app.use(express.urlencoded({extended: false}));
    //cada vez que llegan datos de un formulario a través de cualquier método, vamos a convertir esos datos en un objeto JSON para poder manipularlos
app.use(methodOverride('_method'));


app.use(session({
    secret:'secret',
    resave: true,  //config. inicial del modulo (va junto a flash)
    saveUninitialized: true
}));
//configuración basica del modulo session que será el que envie mensajes entre las diferentes
//paginas (vistas) de la aplicación (al pasasr de unas a otras, por ejemplo)

//A continuación de session inicializamos el modulo passport (ya que passport necesia session)
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());


//VARIABLES GLOBALES: crearemos aquñi variabels que serán accesibles en todo el proyecto
app.use((req, res,next) => {
    res.locals.success_msg = req.flash('success_msg');
    //variable del servicor donde guardamos el valor(success_msg se lo damos nosotros tambien en el lado del servidor) = llamada al valor de la variable que hemos creado
    res.locals.error_msg = req.flash('error_msg');
    //variable del servidor (error_msg) para manejar los mensajes de error con flash ('error_msg')
    res.locals.error = req.flash('error');
    //passport crea su variable error para gestionas estos mensajes, aqui la definimos para nuestro modulo flash
    res.locals.user = req.user || null //req.user es donde passport guarda la variable user que usaremos para ocultar o mostrar contenido a usuarios logeados
    next(); //es solamente para que contiue ejecutando el codigo que está debajo
});
//estamos definiendo nuestro propio middleware para poder utilizar el modulo flash y sus mensajes (sacarlo por pantalla con un partial)


//RUTAS
app.use(require('./routes/index.routes'));
app.use(require('./routes/notes.routes'));
app.use(require('./routes/users.routes'));


//STATIC FILES 
app.use(express.static(path.join(__dirname, 'public')));
    //similar a como configuramos views pero para permitir un acceso sencillo a los archivos por parte 
    //de cualquier aplicacion cliente o el navegador



module.exports = app;