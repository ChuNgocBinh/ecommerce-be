const bcrypt = require('bcrypt');
const authModel = require('./auth.model');
const tokenProvider = require('../common/tokenProvider');

const register = async (req, res, next) => {
  const { username, email, password } = req.body;

  const salt = bcrypt.genSaltSync(10);
  const hashPassword = bcrypt.hashSync(password, salt);

  const newUser = await authModel.create({
    username,
    email,
    password: hashPassword,
  });

  res.status(200).send({
    id: newUser._id,
    username: newUser.username,
    email: newUser.email,
  });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  const userByEmail = await authModel.findOne({ email });
  const verifyPasswrd = bcrypt.compareSync(password, userByEmail.password);

  if (!verifyPasswrd) {
    res.status(401).send('password wrong');
  }

  const data = {
    id: userByEmail._id,
    email: userByEmail._email,
    username: userByEmail._username,
  };

  const token = tokenProvider.createToken(data);

  res.status(200).send({
    id: userByEmail._id,
    username: userByEmail.username,
    email: userByEmail.email,
    token,
  });
};

module.exports = {
  register,
  login,
};
