const catchException = (functionName, e, send, next) => {
  console.log(`${functionName} error:`, e);
  send.error(e);
  return next(e);
};

module.exports = catchException;
