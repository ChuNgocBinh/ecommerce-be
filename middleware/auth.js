const { verifyToken } = require('../common/tokenProvider');
const { getUserById } = require('../modules/auth/auth.model');

const isAuth = async (req, res, next) => {
  try {
    const bearerToken = req.headers.authorization;
    const token = bearerToken.split(' ')[1];
    const userInfo = verifyToken(token);

    const user = await getUserById(userInfo.id);
    req.user = user;

    next();
  } catch (error) {
    console.log(error);
    next();
  }
};

module.exports = isAuth;
