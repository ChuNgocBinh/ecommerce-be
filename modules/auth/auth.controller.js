const { default: axios } = require('axios');
const bcrypt = require('bcrypt');
const fastCsv = require('fast-csv');
const admin = require('firebase-admin');
const { OAuth2Client } = require('google-auth-library');
const HttpError = require('../../common/httpError');
const tokenProvider = require('../../common/tokenProvider');
const authModel = require('./auth.model');
const serviceAccount = require('../../serviceAccountKey.json');
const { verifyRecapcha } = require('../../util/until');
const { defaultPassword } = require('../../util/common');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

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

  if (!existedUser) {
    throw new HttpError('Account is not existed', 400);
  }
  const verifyPasswrd = bcrypt.compareSync(password, existedUser.password);

  if (!verifyPasswrd) {
    throw new HttpError('wrong password', 400);
  }
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

  const accessToken = tokenProvider.createToken(dataToken);
  const refreshToken = tokenProvider.createRefreshToken(dataToken);
  const isUpdate = await authModel.updateUserInfo(existedUser.id, {
    access_token: accessToken,
    refresh_token: refreshToken
  });
  if (!isUpdate) {
    throw new HttpError('server error', 500);
  }
  res.send({
    data,
    token: accessToken,
    refreshToken
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

const loginGoogleSSO = async (req, res, next) => {
  const bodyData = req.body;

  const isVerify = await verifyRecapcha(bodyData.recapchaToken);
  if (!isVerify.data.success) {
    throw new HttpError('recapcha is not verify', 400);
  }

  let result;
  if (bodyData.rule === 'firebase') {
    result = await admin.auth().verifyIdToken(bodyData.idToken);
  } else {
    const ticket = await client.verifyIdToken({
      idToken: bodyData.idToken,
      audience: process.env.GOOGLE_CLIENT_ID
    });
    const payload = ticket.getPayload();
    console.log(payload);
  }
  const dataUpdate = {
    user_name: result.name,
    email: result.email,
    profile_picture: result.picture,
    gg_sso: 1
  };
  let dataToken;
  let dataResponse;
  const existedUser = await authModel.getUserByEmail(result.email);
  if (existedUser) {
    dataToken = {
      id: existedUser.id,
      email: existedUser.email,
      username: existedUser.user_name,
    };
    dataResponse = {
      id: existedUser.id,
      email: result.email,
      username: result.name,
      phone_number: existedUser.phone_number,
      address: existedUser.address,
      profile_picture: result.picture,
      isActive: existedUser.isActive,
    };
    const isUpdateUser = await authModel.updateUserInfo(existedUser.id, dataUpdate);
    if (!isUpdateUser) {
      throw new HttpError('server errror', 400);
    }
  } else {
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(defaultPassword, salt);
    dataUpdate.password = hashPassword;
    const isNewUser = await authModel.createGoogleSSOUser(dataUpdate);
    dataToken = {
      id: isNewUser[0],
      email: result.email,
      username: result.user_name,
    };

    dataResponse = {
      id: isNewUser[0],
      email: result.email,
      username: result.name,
      phone_number: null,
      address: null,
      profile_picture: result.picture,
      isActive: 1,
    };
  }

  const token = tokenProvider.createToken(dataToken);
  const refreshToken = tokenProvider.createRefreshToken(dataToken);
  const isUpdate = await authModel.updateUserInfo(dataToken.id, {
    access_token: token,
    refresh_token: refreshToken
  });

  if (!isUpdate) {
    throw new HttpError('server error', 500);
  }

  res.send({
    status: 'success',
    token,
    refresh_token: refreshToken,
    data: dataResponse
  });
};

const refreshToken = async (req, res, next) => {
  const bearerToken = req.headers.authorization;
  const access_token = bearerToken.split(' ')[1];
  const { refresh_token } = req.body;

  const tokenInfo = tokenProvider.verifyTokenExpire(access_token);
  const userInfo = await authModel.getUserInfo(tokenInfo.id);
  if (!userInfo) {
    throw new HttpError('Khong tim thay user', 400);
  }

  if (refresh_token !== userInfo.refresh_token) {
    throw new HttpError('refresh token khong chinh xac', 405);
  }
  const refreshTokenDecode = tokenProvider.verifyRefreshToken(refresh_token);
  if (!refreshTokenDecode) {
    throw new HttpError('refresh token expire', 405);
  }
  const userToken = {
    id: tokenInfo.id,
    email: tokenInfo.email,
    username: tokenInfo.username,
  };
  const newAccessToken = tokenProvider.createToken(userToken);
  const newRefreshToken = tokenProvider.createRefreshToken(userToken);

  const isUpdate = await authModel.updateUserInfo(userInfo.id, {
    access_token: newAccessToken,
    refresh_token: newRefreshToken
  });
  if (!isUpdate) {
    throw new HttpError('server error', 500);
  }
  res.send({
    access_token: newAccessToken,
    refresh_token: newRefreshToken
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
  loginGoogleSSO,
  refreshToken
};
