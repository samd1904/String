const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
//const { Server } = require('socket.io');
const io = require('socket.io')(server, {
  cors: {
    origin: "http://localhost:5173", // or the URL of your Vue.js app
    methods: ["GET", "POST"]
  }
});

app.get('/', (req, res)=>{res.sendFile(__dirname+"/index.html")});

io.on('connection', socket=>{
  console.log('A user has connected');
  socket.on('chat message', msg=>{
    console.log("chat recieved", msg)
    io.emit('chat message', msg);
  })
})

server.listen(3000, ()=>{
  console.log("Listening on port 3000....");
});
