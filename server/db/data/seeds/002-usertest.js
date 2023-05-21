/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('userlibrary').del();
  await knex('userlibrary').insert([
    {
      uid: 'noobmaster69',
      displayName: 'noobmaster69',
      userToken: '',
      profanity: true,
      anonymous: false,
    },
    {
      uid: 'thestudent',
      displayName: 'thestudent',
      userToken: '',
      profanity: true,
      anonymous: false,
    },
    {
      uid: 'thecommuter',
      displayName: 'thecommuter',
      userToken: '',
      profanity: true,
      anonymous: false,
    },
    {
      uid: 'thecoder',
      displayName: 'thecoder',
      userToken: '',
      profanity: true,
      anonymous: false,
    },
    {
      uid: 'thegamer',
      displayName: 'thegamer',
      userToken: '',
      profanity: true,
      anonymous: false,
    },
  ]);
};
