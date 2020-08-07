const mariadb = require('mysql'); 

const mariadbConection = mariadb.createConnection({
    host: 'localhost',
    user:'root',
    password:'root',
    database:'proyectoweb'
});

mariadbConection.connect( function(error){
    if(error){
        console.log(error);
        return; 
    }else{
        console.log('Mariadb esta conectada')

    }
});

module.exports = mariadbConection;