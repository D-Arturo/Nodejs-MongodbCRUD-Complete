require('dotenv').config();
//requerimos el metodo config del modulo dotenv para crear variables de entorno en el archivo (env) que vamos a crear
//lo ponemos al comienzo para que lo primeor que se haga sea crear esas varables antes de ejecutar cualquier otro codigo.
//Estos archivos de entorno es donde declararemos y usaremos variables con informacion sensible (contraseñas, datos, etc) 
//o que simplemente no queremos que nadie la vea. Por tanto el archivo .env nunca se subira al repositorio. Solamente lo usaremos nosotros.

const app = require('./server');
require('./database');

app.listen(app.get('port'), () => {
    console.log('Server on port ', app.get('port'));
});