const axios = require('axios');
const { getConversationByUserId } = require('../modules/conversation/conversation.model');

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

const joinRoomConversation = async (user_id, eventIo) => {
  const listCvs = await getConversationByUserId(user_id);
  listCvs.forEach((el) => {
    console.log(el);
    eventIo.emit('Join-Room-Conversation', el.conversation_id);
  });
};

module.exports = {
  verifyRecapcha,
  joinRoomConversation
};
