const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const cors = require('cors');

io.on('connection', socket => {
  socket.on('message', message => {
    socket.broadcast.emit('message', message);
  });
});

app.use(cors());

http.listen(3000, () => {
  console.log('Server is running on port 3000');
});
