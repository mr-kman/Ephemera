const knex = require('../knex');
const { validProps, requiredProps } = require('../util/validation');

const validateProps = validProps([
  'uid',
  'displayName',
  'userToken',
  'profanity',
  'anonymous',
]);

//const validateRequired = requiredProps(['email', 'last_name', 'postal_code']);

const USER_TABLE = 'userlibrary';

module.exports = {
  USER_TABLE,

  create(user) {
    //validateRequired(validateProps(order));
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
