const handleError = (err, req, res) => {
  const status = err.status || 500;
  res.status(status).send({ status: 'fail', error: err.message });
};

module.exports = handleError;
