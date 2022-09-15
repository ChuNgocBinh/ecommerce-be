const { getAll } = require('./conversation.model');

const getListConversation = async (req, res, next) => {
  const { page, page_size } = req.query;
  const { user } = req;
  const skip = (page - 1) * page_size;
  const limit = page_size;
  const result = await getAll(user, skip, limit);
  console.log(result);
  res.send({
    status: 'success',
  });
};

module.exports = {
  getListConversation,

};
