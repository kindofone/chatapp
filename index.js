const express = require('express');
const path = require('path');
const app = express();
const http = require('http');
const httpServer = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(httpServer);

const users = {};
const port = process.env.PORT || 4000;

app.use(express.static(path.join(__dirname, 'client', 'build')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
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

httpServer.listen(port, () => {
  console.log('listening on *:4000');
});