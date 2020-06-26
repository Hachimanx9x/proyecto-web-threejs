const ex = require('express'); 
const fs = require('fs'); 
const path = require('path'); 

const config = require('./servidor/configuracion'); 

const bd = require('./baseDatos'); 

const app = config(ex()); 

const baseDatos = require('./baseDatos'); 
const http = require('http').Server(app);

const io = require('socket.io')(http);


io.on('connection', function(socket){
    console.log('a user connected');
    socket.on('disconnect', function(){
      console.log('user disconnected');
    });
    socket.on('chat message', function(msg){
      io.emit('chat message', msg);
    });
  });

  
http.listen(app.get('port') , ()=>{
    console.log(`Servidor iniciado en ${app.get('port')}`);
}); 
 