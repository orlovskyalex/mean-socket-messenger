const jwt = require('jsonwebtoken');
const Message = require('mongoose').model('Message');

class Socket {

  init(io) {
    this.io = io;
    this.io.use(this.tokenValidator);
    this.io.on('connection', this.registerSocketListeners());
  }

  tokenValidator(socket, next) {
    const { token } = socket.handshake.query;

    jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, jwtPayload) => {
      if (!err) {
        socket.join(jwtPayload.userId);
      }

      next();
    });
  }

  registerSocketListeners() {
    return (socket) => {
      socket.on('new message', async (data) => {
        try {
          const message = await Message.new(data);
          this.io.to(message.recipient._id).to(message.sender._id).emit('new message', message);
        } catch (e) {
          console.log(e);
        }
      });
    };
  }

}

module.exports = new Socket();
