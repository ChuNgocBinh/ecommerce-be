const HttpError = require('../common/httpError');
const { verifyToken } = require('../common/tokenProvider');
const { getUserById } = require('../modules/auth/auth.model');

const isAuth = async (req, res, next) => {
  const bearerToken = req.headers.authorization;
  const token = bearerToken.split(' ')[1];
  const userInfo = verifyToken(token);
  if (!userInfo) {
    throw new HttpError('Forbidden', 403);
  }
  const user = await getUserById(userInfo.id);
  req.user = user;

  next();
};

module.exports = isAuth;
