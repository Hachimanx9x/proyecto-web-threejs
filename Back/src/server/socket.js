const http = require('./httpx');
const io = require('socket.io')(http);


//al iniciar una conexion en hilo de envio de datos
io.on('connection', function (socket) {
  console.log(`usuario ${socket.id}`);


  socket.rooms = socket.handshake.query.reunion;
  socket.join(socket.handshake.query.reunion)

  io.in(socket.rooms).emit('inicio', { id: socket.id });


  socket.on('chat message', function (msg) {
    //  console.log(msg);
    msg.from = socket.id.slice(8);
    msg.rooms = socket.rooms;

    io.in(socket.rooms).emit('chat message', msg);


  });
  socket.on('audio', function (audio) {
    io.in(socket.rooms).emit('hablar', audio);
  });
  socket.on('micro', function (micro) {
    io.in(socket.rooms).emit('hablar', { id: socket.id, micro: micro });
  });

  socket.on('disconnect', function () {
    console.log('un usuario desconectado');
  });



});

module.exports = http;

