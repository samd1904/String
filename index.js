const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
//const { Server } = require('socket.io');
const io = require('socket.io')(server, {
  cors: {
    origin: ["http://localhost:5173","https://cool-banoffee-1bc218.netlify.app"], // or the URL of your Vue.js app
    methods: ["GET", "POST"]
  }
});

app.get('/', (req, res) => { res.sendFile(__dirname + "/index.html") });

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
  console.log('A user has connected');
  console.log('socket room', socket.roomId);
  socket.join(socket.roomId)
  socket.emit("room connected", socket.roomId)
  socket.on('chat message', (data) => {
    console.log('recieved chat 2')
    console.log(data)
    io.to(data.to).emit('chat message', data.msg);
  })
})

server.listen(3000, () => {
  console.log("Listening on port 3000....");
});
