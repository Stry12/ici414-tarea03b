const App = require('./App.js');

// Iniciar servidor
const server = App.listen(App.get('port'), () => {
    console.log(`Server listening on port ${server.address().port} in ${App.get('env')} mode`);
});

server.timeout = 600000; 
