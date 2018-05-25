const response = (res) => {
  const prepareErrors = (errors) => {
    const response = {
      data: null,
      errors: [],
    };

    if (Array.isArray(errors)) {
      response.errors = errors;
    } else if (typeof errors === 'object') {
      response.errors.push(errors);
    } else if (typeof errors === 'string') {
      response.errors.push({ message: errors });
    } else {
      response.errors.push({ message: 'Bad request!' });
    }

    return response;
  };

  const sendJSONResponse = (data) => {
    return res.send({
      data,
      errors: null,
    });
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
