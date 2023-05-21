const knex = require('../knex');
const { validProps, requiredProps } = require('../util/validation');

const validateProps = validProps([
  'id',
  'fb_uid',
  'messagePlain',
  'messageFilter',
  'messageSize',
  'uploadTime',
  'likeCount',
]);

//const validateRequired = requiredProps(['email', 'last_name', 'postal_code']);

const MESSAGE_TABLE = 'message';
const INTERACTION_TABLE = 'interaction';

module.exports = {
  MESSAGE_TABLE,

  create(message) {
    return knex(MESSAGE_TABLE)
      .insert(message)
      .catch(function (error) {
        console.error(error);
      });
  },

  getLastMessage(profanity) {
    if (profanity) {
      return knex(MESSAGE_TABLE)
        .join('userlibrary', 'message.fb_uid', 'userlibrary.uid')
        .select({
          uid: 'fb_uid',
          messageId: 'id',
          displayName: 'userlibrary.displayName',
          messageContent: 'messageFilter',
          messageSize: 'messageSize',
          uploadTime: 'uploadTime',
          likeCount: 'likeCount',
        })
        .orderBy('id', 'desc')
        .limit(1);
    } else {
      return knex(MESSAGE_TABLE)
        .join('userlibrary', 'message.fb_uid', 'userlibrary.uid')
        .select({
          uid: 'fb_uid',
          messageId: 'id',
          displayName: 'userlibrary.displayName',
          messageContent: 'messagePlain',
          messageSize: 'messageSize',
          uploadTime: 'uploadTime',
          likeCount: 'likeCount',
        })
        .orderBy('id', 'desc')
        .limit(1);
    }
  },

  getAllMessages(profanity) {
    if (profanity) {
      return knex(MESSAGE_TABLE)
        .join('userlibrary', 'message.fb_uid', 'userlibrary.uid')
        .select({
          uid: 'fb_uid',
          messageId: 'id',
          displayName: 'userlibrary.displayName',
          messageContent: 'messageFilter',
          messageSize: 'messageSize',
          uploadTime: 'uploadTime',
          likeCount: 'likeCount',
        });
    } else {
      return knex(MESSAGE_TABLE)
        .join('userlibrary', 'message.fb_uid', 'userlibrary.uid')
        .select({
          uid: 'fb_uid',
          messageId: 'id',
          displayName: 'userlibrary.displayName',
          messageContent: 'messagePlain',
          messageSize: 'messageSize',
          uploadTime: 'uploadTime',
          likeCount: 'likeCount',
        });
    }
  },

  getInteractions() {
    return knex(INTERACTION_TABLE).select({
      id: 'id',
      uid: 'fb_uid',
      messageId: 'messageId',
      like: 'likeInteraction',
    });
  },

  async upvote(payload) {
    const message = await knex(MESSAGE_TABLE)
      .select({
        id: 'id',
        fb_uid: 'fb_uid',
        messagePlain: 'messagePlain',
        messageFilter: 'messageFilter',
        messageSize: 'messageSize',
        uploadTime: 'uploadTime',
        likeCount: 'likeCount',
      })
      .where('id', '=', payload.id)
      .first();

    let likeCount = message['likeCount'] + 1;
    message['likeCount'] = likeCount;

    //cannot increase count if user already liked
    let previouslyLiked = await knex(INTERACTION_TABLE)
      .select({
        fb_uid: 'fb_uid',
        messageId: 'messageId',
      })
      .where('fb_uid', '=', payload.uid)
      .where('messageId', '=', payload.id);

    if (previouslyLiked.length < 1) {
      await knex(MESSAGE_TABLE).where('id', '=', message['id']).update({
        likeCount: likeCount,
      });

      await knex(INTERACTION_TABLE).insert({
        fb_uid: message['fb_uid'],
        messageId: message['id'],
        likeInteraction: 1,
      });
    }

    return await this.getAllMessages(payload.filtered);
  },
};
