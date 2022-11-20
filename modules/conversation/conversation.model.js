const db = require('../../db/db_helper');

const getAll = async (id, skip, limit) => {
  try {
    const res = await db('participants')
      .leftJoin('conversation', 'conversation.id', 'participants.conversation_id')
      .select(
        'participants.conversation_id',
        'participants.user_id',
        'conversation.title',
        'conversation.created_by',
      )
      .offset(skip)
      .limit(limit)
      .where('user_id', id);
    if (res) {
      return res;
    }
    return false;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const getConversationByUserId = async (id) => {
  try {
    const res = await db('participants')
      .select(
        'conversation_id',
      )
      .where('user_id', id);
    if (res) {
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
  getConversationByUserId
};
