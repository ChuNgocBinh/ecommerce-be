const jwt = require('jsonwebtoken');

const createToken = (data) => {
  const token = jwt.sign(data, process.env.JWT_PRIVATE_KEY, { expiresIn: process.env.JWT_EXPIRE_TIME });
  return token;
};

const verifyToken = (token) => {
  const decode = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
  return decode;
};

module.exports = {
  createToken,
  verifyToken,
};
