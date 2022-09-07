const axios = require('axios');

const verifyRecapcha = async (token) => {
  const respon = await axios({
    url: 'https://www.google.com/recaptcha/api/siteverify',
    method: 'POST',
    params: {
      secret: process.env.SETCRET_KEY_RECAPCHA,
      response: token
    }
  });
  return respon;
};

module.exports = {
  verifyRecapcha
};
