const catchException = (functionName, send, next, err, errToSend = err) => {
  console.log(`${functionName} error:`, err);
  send.error(errToSend);
  return next(err);
};

module.exports = catchException;
