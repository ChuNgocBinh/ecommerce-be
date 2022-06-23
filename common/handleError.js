const handleError = (err, req, res, next) => {
  console.log('vao day');
  console.log('err', err);
  const status = err.status || 500;
  res.status(status).send({ status: 'fail', error: err.message });
};

module.exports = handleError;
