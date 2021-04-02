const http = require("./httpx");
const io = require("socket.io")(http, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

//al iniciar una conexion en hilo de envio de datos
io.on("connection", function (socket) {
  console.log(`usuario ${socket.id}`);
  socket.on("entra room", (room) => {
    console.log(`Una nuevo usuario entro a la sala ${room}`);
    //se le asigna el objeto de la sala (datos del usuario)
    socket.room = room;
    //se define el hilo de conexion con esa sala
    socket.join(room);
    // console.log(getuserroom(room))

    //se emite un mensaje a todos los que esten en esa sala del nuevo usuario
    io.in(socket.room).emit("entrar", {
      iserid: socket.id,
      room: getuserroom(room, socket.id),
      num: getuserroom(room, socket.id).length,
    });
  });
  //se escucha el evento hablar
  socket.on("hablar", (data) => {
    // se emite un objeto con lo que dice esa persona y su id
    io.in(socket.room).emit("hablar", { raw: data, id: socket.id });
  });
  socket.on("chat message", function (msg) {
    //  console.log(msg);
    msg.from = socket.id.slice(8);
    msg.rooms = socket.rooms;

    io.in(socket.rooms).emit("chat message", msg);
  });

  socket.on("disconnect", function () {
    io.in(socket.rooms).emit("chao", socket.id);
    console.log(`el usuario ${socket.id} en la sala ${socket.rooms}`);
  });
});

module.exports = http;

function getuserroom(room, id) {
  const nsp = io.of("/");
  const rooms = nsp.adapter.rooms.get(room);
  let list = [];
  for (const clientId of rooms) {
    const clientSocket = io.sockets.sockets.get(clientId);
    list.push(clientSocket.id);
  }

  return list;
}
