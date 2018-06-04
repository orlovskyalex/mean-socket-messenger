const jwt = require('jsonwebtoken');
const Message = require('mongoose').model('Message');

class Socket {

  init(io) {
    this.io = io;
    this.io.on('connection', this.registerSocketListeners());
  }

  registerSocketListeners() {
    return (socket) => {
      socket.on('enter conversation', conversation => {
        socket.join(conversation);
      });

      socket.on('leave conversation', conversation => {
        socket.leave(conversation);
      });

      socket.on('new message', conversation => {
        this.io.sockets.in(conversation).emit('refresh messages', conversation);
      });
    };
  }

}

module.exports = new Socket();
