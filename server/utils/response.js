const response = (res) => {
  const prepareErrors = (errors) => {
    if (Array.isArray(errors)) {
      return errors;
    }

    if (typeof errors === 'object') {
      if (errors.errors) {
        return Object.keys(errors.errors).map(error => {
          return { message: errors.errors[error].message };
        });
      } else {
        return [errors];
      }
    }

    if (typeof errors === 'string') {
      return [{ message: errors }];
    }

    return [{ message: 'Bad request!' }];
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
