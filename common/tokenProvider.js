const jwt = require('jsonwebtoken');

const createToken = (data) => {
  const token = jwt.sign(data, process.env.JWT_PRIVATE_KEY, { expiresIn: process.env.JWT_EXPIRE_TIME });
  return token;
};

const createRefreshToken = (data) => {
  const token = jwt.sign(data, process.env.JWT_REFRESH_TOKEN_PRIVATE_KEY, { expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRE_TIME });
  return token;
};

const verifyToken = (token) => {
  try {
    const decode = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
    return decode;
  } catch (error) {
    return null;
  }
};

const verifyRefreshToken = (token) => {
  try {
    const decode = jwt.verify(token, process.env.JWT_REFRESH_TOKEN_PRIVATE_KEY);
    return decode;
  } catch (error) {
    return null;
  }
};

const verifyTokenExpire = (token) => {
  try {
    const decode = jwt.verify(token, process.env.JWT_PRIVATE_KEY, {
      ignoreExpiration: true
    });
    return decode;
  } catch (error) {
    return null;
  }
};

module.exports = {
  createToken,
  verifyToken,
  createRefreshToken,
  verifyRefreshToken,
  verifyTokenExpire
};
