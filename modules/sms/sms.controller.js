const authToken = process.env.TWILIO_AUTH_TOKEN;
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const client = require('twilio')(accountSid, authToken);
const HttpError = require('../../common/httpError');

const getCodeSms = async (req, res, next) => {
  try {
    const { phoneNumber, lang } = req.body;
    if (!phoneNumber || !lang) {
      throw new HttpError('field can not blank', 400);
    }
    await client.verify.v2.services(process.env.TWILIO_SERVICES_SID)
      .verifications
      .create({ to: phoneNumber, channel: 'sms', locale: lang || 'en' })
      .then((verification) => console.log(verification));

    res.send({
      status: true
    });
  } catch (error) {
    console.log(error);
    throw new HttpError('server error', 400);
  }
};

const verifyCodeSms = async (req, res, next) => {
  try {
    const { phoneNumber, code } = req.body;
    if (!phoneNumber || !code) {
      throw new HttpError('field can not blank', 400);
    }
    const result = await client.verify.v2.services(process.env.TWILIO_SERVICES_SID)
      .verificationChecks
      .create({ to: phoneNumber, code });

    if (result.status === 'pending') {
      throw new HttpError('Wrong phonenumber', 400);
    }

    res.send({
      status: true,
    });
  } catch (error) {
    if (error.code === 20404) {
      throw new HttpError('Wrong phonenumber', 400);
    }
    console.log(error);
    throw new HttpError('server error', 500);
  }
};

module.exports = {
  getCodeSms,
  verifyCodeSms
};
