const socketIO = require("socket.io");

const socket = {};

function connect(server) {
  socket.io = socketIO(server);

  socket.io.on("connection", function (connectedSocket) {
    // eslint-disable-next-line no-console
    console.log("A user connected");
    connectedSocket.on("disconnect", function () {
      // eslint-disable-next-line no-console
      console.log("User disconnected");
    });
  });
}

connect.socket = socket;

module.exports = connect;
