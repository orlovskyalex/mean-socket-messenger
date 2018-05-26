const response = (res) => {
  const prepareErrors = (errors) => {
    let errorsArray = [];

    if (Array.isArray(errors)) {
      errorsArray = errors;
    } else if (typeof errors === 'object') {
      errorsArray.push(errors);
    } else if (typeof errors === 'string') {
      errorsArray.push({ message: errors });
    } else {
      errorsArray.push({ message: 'Bad request!' });
    }

    return errorsArray;
  };

  const sendJSONResponse = (data) => {
    res.send(data);
  };

  const sendBadResponse = (errors, status = 400) => {
    res.status(status).send(prepareErrors(errors));
  };

  return {
    json: sendJSONResponse,
    error: sendBadResponse,
  };
};

module.exports = response;
