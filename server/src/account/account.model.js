const knex = require('../knex');
const USER_TABLE = 'userlibrary';

module.exports = {
  USER_TABLE,

  create(user) {
    return knex(USER_TABLE)
      .insert(user)
      .catch(function (error) {
        console.error(error);
      });
  },

  getUserByUID(uid) {
    return knex
      .select({
        uid: 'uid',
        displayName: 'displayName',
        userToken: 'userToken',
        profanity: 'profanity',
        anonymous: 'anonymous',
      })
      .from(USER_TABLE)
      .where('uid', '=', uid)
      .first();
  },

  setUserPreferences(payload) {
    return knex(USER_TABLE).where('uid', '=', payload.uid).update({
      displayName: payload.displayName,
      profanity: payload.profanity,
      anonymous: payload.anonymous,
    });
  },
};
