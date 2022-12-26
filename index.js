const express = require('express');
const app = express();
const http = require('http');
const httpServer = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(httpServer);

const users = {};

app.get('/', (req, res) => {
  res.send('<h1>Server</h1>');
});

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('disconnect', () => {
    console.log('a user disconnected');
  });

  socket.on('login', payload => {
    console.log('new login', payload.username);
    users[payload.username] = true;
    io.emit('participants', Object.keys(users));
  });

  socket.on('message', payload => {
    console.log(payload.body);
    io.emit('messageResponse', payload);
  });
});

httpServer.listen(4000, () => {
  console.log('listening on *:4000');
});