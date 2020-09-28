const http = require('./httpx'); 
const io = require('socket.io')(http);

io.on('connection', function(socket){
    console.log('un usuario conectado');
    socket.on('disconnect', function(){
      console.log('un usuario desconectado');
    });
    socket.on('chat message', function(msg){
      console.log(msg); 
      msg.from =socket.id.slice(8);  
      io.emit('chat message', msg);
    });
  });

  module.exports = io; 