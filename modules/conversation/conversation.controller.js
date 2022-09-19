const { getAll } = require('./conversation.model');

const getListConversation = async (req, res, next) => {
  const { page, page_size } = req.query;
  const { user } = req;
  const skip = (page - 1) * page_size;
  const limit = page_size;
  const result = await getAll(user.id, skip, limit);

  res.send({
    status: 'success',
    data: result
  });
};

module.exports = {
  getListConversation,

};
