const { getAll } = require('./message.model');

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

module.exports = {
  getMessagesByconversationId,

};
