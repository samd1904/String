import {Server} from "socket.io";
function initializeSocket(server) {
  try {
    const io = new Server(server, {
      cors: {
        origin: ["http://localhost:5173", "https://cool-banoffee-1bc218.netlify.app"], // or the URL of your Vue.js app
        methods: ["GET", "POST"]
      }
    });

    io.use((socket, next) => {
      const { username, roomId } = socket.handshake.auth;
      if (!username) {
        return next(new Error("invalid username"));
      }
      socket.username = username;
      socket.roomId = roomId;
      next();
    });

    io.on('connection', socket => {
      socket.join(socket.roomId)
      socket.emit("room connected", { roomId: socket.roomId, username: socket.username })
      socket.on('chat message', (data) => {
        console.log(data)
        io.to(data.to).emit('chat message', { msg: data.msg, from: data.from });
      })
    })
  } catch (err) {
    console.log("Error in socket connection ", err)
  }
}

export {
  initializeSocket
}
