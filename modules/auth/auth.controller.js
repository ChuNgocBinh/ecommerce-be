const bcrypt = require('bcrypt');
const fastCsv = require('fast-csv');
const HttpError = require('../../common/httpError');
const tokenProvider = require('../../common/tokenProvider');
const authModel = require('./auth.model');

const createUserAdmin = async (req, res, next) => {
  const { username, email, password } = req.body;

  const salt = bcrypt.genSaltSync(10);
  const hashPassword = bcrypt.hashSync(password, salt);

  const existedUser = await authModel.getUserAdminByEmail(email);
  if (existedUser) {
    throw new HttpError('Email existed', 400);
  }

  const newUser = await authModel.createUserAdmin({
    user_name: username,
    email,
    password: hashPassword,
  });

  res.status(200).send({
    status: 'success',
  });
};

const loginAdmin = async (req, res, next) => {
  const { email, password } = req.body;

  const existedUser = await authModel.getUserAdminByEmail(email);
  if (!existedUser) {
    throw new HttpError('Account is not existed', 400);
  }
  const verifyPasswrd = bcrypt.compareSync(password, existedUser.password);

  if (!verifyPasswrd) {
    throw new HttpError('wrong pass word', 400);
  }

  const data = {
    id: existedUser.id,
    email: existedUser.email,
    username: existedUser.user_name,
  };

  const token = tokenProvider.createToken(data);

  res.status(200).send({
    data,
    token,
  });
};

const createUser = async (req, res, next) => {
  const {
    username, email, password, phoneNumber,
  } = req.body;

  const salt = bcrypt.genSaltSync(10);
  const hashPassword = bcrypt.hashSync(password, salt);

  // tìm  user trong db
  const existedUser = await authModel.getUserAdminByEmail(email);
  if (existedUser) {
    throw new HttpError(400, 'Email existed');
  }

  const newUser = await authModel.createUser({
    user_name: username,
    email,
    phone_number: phoneNumber,
    password: hashPassword,
  });

  res.status(200).send({
    status: 'success',
  });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  const existedUser = await authModel.getUserByEmail(email);

  if (!existedUser) {
    throw new HttpError('Account is not existed', 400);
  }
  const verifyPasswrd = bcrypt.compareSync(password, existedUser.password);

  if (!verifyPasswrd) {
    throw new HttpError('wrong password', 400);
  }
  console.log(existedUser);
  const data = {
    id: existedUser.id,
    email: existedUser.email,
    username: existedUser.user_name,
    phone_number: existedUser.phone_number,
    address: existedUser.address,
    profile_picture: existedUser.profile_picture,
    isActive: existedUser.isActive,
  };
  const dataToken = {
    id: existedUser.id,
    email: existedUser.email,
    username: existedUser.user_name,
  };

  const token = tokenProvider.createToken(dataToken);

  res.send({
    data,
    token,
  });
};

const getMe = async (req, res, next) => {
  const { user } = req;
  const userInfo = await authModel.getUserById(user.id);
  if (!userInfo) {
    throw new HttpError('user is not existed', 400);
  }
  res.send({
    status: 'success',
    data: userInfo,
  });
};

const exportUserCsv = async (req, res, next) => {
  res.attachment('user.csv');
  const result = await authModel.getlistUser();
  res.pipe(fastCsv.format({ headers: true })).pipe(res);
};

module.exports = {
  createUserAdmin,
  loginAdmin,
  createUser,
  login,
  exportUserCsv,
  getMe,
};
