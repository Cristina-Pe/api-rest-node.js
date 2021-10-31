//Conexión a la base de datos

const mysql = require('mysql');

const mysqlConnection = mysql.createConnection({
    host:'localhost',
    user: 'root',
    password: 'password',
    database:'mascotas',
    insecureAuth : true
})

mysqlConnection.connect(function(err){
     if(err){
        console.log('Base de datos NO conectada');
         console.log(err);
         return;
     }else{
        console.log('Base de datos conectada');
     }
});

module.exports = mysqlConnection;