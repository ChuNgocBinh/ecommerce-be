const { getAll, createNewMessage } = require('./message.model');

const getMessagesByconversationId = async (req, res, next) => {
  const { cvs_id } = req.params;
  const { page, page_size } = req.query;
  const { user } = req;
  const skip = (page - 1) * page_size;
  const limit = page_size;
  const result = await getAll(cvs_id, skip, limit);

  res.send({
    status: 'success',
    data: result
  });
};

const createMessage = async (req, res, next) => {
  const { cvs_id } = req.params;
  const { content } = req.body;
  const { user, eventIo } = req;
  const data = {
    conversation_id: cvs_id,
    sender_id: user.id,
    content
  };
  const result = await createNewMessage(data);
  eventIo.emit('new-message', data);
  res.send({
    status: 'success',
  });
};

module.exports = {
  getMessagesByconversationId,
  createMessage
};
