import "dotenv/config.js";
import express from 'express';
import http from 'http';
const app = express();
const server = http.createServer(app);
import { initializeSocket } from './socket.js';
import './database.js';
initializeSocket(server);
app.get('/', (req, res) => { res.sendFile(__dirname + "/index.html") });
const PORT = process.env.PORT || 4080;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
