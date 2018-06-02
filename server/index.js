const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const cors = require('cors');
const passport = require('passport');
const bodyParser = require('body-parser');
const response = require('./utils/response');

const port = process.env.PORT;

require('./config/db');
require('./config/passport');
require('./config/socket').init(io);

http.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

app.use(passport.initialize());
app.use(cors());
app.use('/', bodyParser.json());

app.use('/api', require('./controllers'));

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    response(res).error(`${err.name}: ${err.message}`, 401);
  }
});
