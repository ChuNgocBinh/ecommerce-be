const { default: axios } = require('axios');
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
    username, email, password, phoneNumber
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
  console.log(existedUser);

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

const getMeAdmin = async (req, res, next) => {
  const { user } = req;
  const userInfo = await authModel.getUserAdminById(user.id);
  if (!userInfo) {
    throw new HttpError('user is not existed', 400);
  }
  res.send({
    status: 'success',
    data: userInfo,
  });
};

const getListUser = async (req, res, next) => {
  const { user } = req;
  const listUser = await authModel.getListUser();
  if (!listUser) {
    throw new HttpError('server error', 400);
  }
  res.send({
    status: 'success',
    data: listUser,
  });
};

const getUserById = async (req, res, next) => {
  const { id } = req.params;
  const listUser = await authModel.getUserById(id);
  if (!listUser) {
    throw new HttpError('server error', 400);
  }
  res.send({
    status: 'success',
    data: listUser,
  });
};

const updateLockUser = async (req, res, next) => {
  const { user } = req;
  const bodyData = req.body;
  const { id } = req.params;

  const newProduct = await authModel.toggleLockUser(bodyData, id);
  if (!newProduct) {
    throw new HttpError('Create product fail', 400);
  }

  res.send({
    status: 'success',
  });
};

const deleteUserById = async (req, res) => {
  const { id } = req.params;
  const deleted = await authModel.deleteUser(id);
  if (!deleted) {
    throw new HttpError('Error');
  }
  res.send({
    status: 'success',
    data: deleted,
  });
};

const updateUser = async (req, res, next) => {
  const { user } = req;
  const data = req.body;
  const isUserUpdate = await authModel.updateUserInfo(user.id, data);
  if (!isUserUpdate) {
    throw new HttpError('server error', 400);
  }
  res.send({
    status: 'success'
  });
};

const recapcha = async (req, res, next) => {
  const secret_key = '6LdCoVohAAAAAIA7jix9yoVyC42IYZW335u7E4pn';
  const token = '03ANYolqtyUaZLBvpwVV5x2mE2RaGbjk6Bs5FIIETOTEXnOuZ-l1Go4JC-1a5AfYX5zTyuKC2PbKYrrkYyO3PDkH0ZLLoxqWKyvCccRplshUUvPiPWJTAXV_C9OGdB4kK9g7G8_e1Hn-iJ80WIG4JD7_kPaEQkC59vCAknkjoc1s5SDgWmK1iOfJqOw1hObYQJt_iYs6wnVpcX-Ieohf4Ggf104EzbznnOOCjjK0pJik-aC06_TuPIo5QPtoh4w28vh8dZATzkNPr2R7cVpizEg-gonxExtai5bGkQvyujAjFCmW6C0XGTVbXfbHIej9uVbHTTXmysoCKedRwZiv4FHZVBu6_9vHb2hRsN9EFsB9tFxppxhTnTirJPAsAzQs_hb1ISdUn_G6AgM2Y0tSHNrNTQn2g6ZAtf86TsJ2g3RC0UIPnEiLqHzwriXsQn0DGQAHAwhTynIMVPi2-pVgiLoTdov3_81V7f0tIULlp4f10sBD5Ls_W58zgiyIDs3UzHfzYL6TfkmsUE';
  const respon = await axios({
    url: 'https://www.google.com/recaptcha/api/siteverify',
    method: 'POST',
    params: {
      secret: secret_key,
      response: token
    }
  });
  console.log(respon.data);
  res.send({
    status: 'success'
  });
};
module.exports = {
  createUserAdmin,
  loginAdmin,
  createUser,
  login,
  getMe,
  getMeAdmin,
  getListUser,
  getUserById,
  updateLockUser,
  deleteUserById,
  updateUser,
  recapcha
};
