class Socket {

  constructor(io) {
    this.io = io;
    this.io.on('connection', this.registerSocketListeners());
  }

  registerSocketListeners() {
    return (socket) => {
      socket.on('join', (rooms) => {
        socket.join(rooms);
      });
    };
  }

  emitNewConversation(recipientId, conversation, message) {
    this.io.in(recipientId).emit('new conversation', conversation, message);
  }

  emitNewMessage(conversationId, message) {
    this.io.in(conversationId).emit('new message', message);
  }

}

const initSocket = (io) => new Socket(io);

module.exports = initSocket;
