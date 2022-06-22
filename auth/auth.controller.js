const bcrypt = require('bcrypt');
const HttpError = require('../common/httpError');
const tokenProvider = require('../common/tokenProvider');
const authModel = require('./auth.model');

const createUserAdmin = async (req, res, next) => {
  const { username, email, password } = req.body;

  const salt = bcrypt.genSaltSync(10);
  const hashPassword = bcrypt.hashSync(password, salt);

  const existedUser = await authModel.getUserByEmail(email);
  if (existedUser) {
    throw HttpError(400, 'Email existed');
  }

  const newUser = await authModel.createUser({
    name: username,
    email,
    phone_number: '123456789',
    password: hashPassword,
  });

  res.status(200).send({
    status: 'success',
  });
};

const loginAdmin = async (req, res, next) => {
  const { email, password } = req.body;

  const existedUser = await authModel.getUserByEmail(email);
  if (!existedUser) {
    throw HttpError(400, 'Account is not existed');
  }
  const verifyPasswrd = bcrypt.compareSync(password, existedUser.password);

  if (!verifyPasswrd) {
    throw HttpError(400, 'wrong pass word');
  }

  const data = {
    id: existedUser._id,
    email: existedUser._email,
    username: existedUser._username,
  };

  const token = tokenProvider.createToken(data);

  res.status(200).send({
    data: {
      id: existedUser._id,
      username: existedUser.username,
      email: existedUser.email,
    },
    token,
  });
};

module.exports = {
  createUserAdmin,
  loginAdmin,
};
