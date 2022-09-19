const db = require('../../db/db_helper');

const getAll = async (id, skip, limit) => {
  try {
    const res = await db('messages')
      .leftJoin('users', 'users.id', 'messages.sender_id')
      .select(
        'messages.content',
        'messages.sender_id',
        'messages.conversation_id',
        'messages.id',
        'messages.replay',
        'messages.createdAt',
        'users.user_name',
        'users.profile_picture',
      )
      .offset(skip)
      .limit(limit)
      .where('messages.conversation_id', id);
    if (res.length) {
      return res;
    }
    return false;
  } catch (error) {
    console.log(error);
    return false;
  }
};

module.exports = {
  getAll,
};
