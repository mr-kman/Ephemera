/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('interaction').del();
  await knex('interaction').insert([
    {
      id: -50,
      fb_uid: 'noobmaster69',
      messageId: -20,
      likeInteraction: 1,
    },
    {
      id: -49,
      fb_uid: 'thestudent',
      messageId: -19,
      likeInteraction: 1,
    },
    {
      id: -48,
      fb_uid: 'thestudent',
      messageId: -20,
      likeInteraction: 1,
    },
    {
      id: -47,
      fb_uid: 'thestudent',
      messageId: -20,
      likeInteraction: -1,
    },
    {
      id: -46,
      fb_uid: 'thestudent',
      messageId: -20,
      likeInteraction: 1,
    },
    {
      id: -45,
      fb_uid: 'thestudent',
      messageId: -13,
      likeInteraction: 1,
    },
    {
      id: -44,
      fb_uid: 'thecommuter',
      messageId: -17,
      likeInteraction: 1,
    },
    {
      id: -43,
      fb_uid: 'thecommuter',
      messageId: -18,
      likeInteraction: 1,
    },
    {
      id: -42,
      fb_uid: 'thecommuter',
      messageId: -16,
      likeInteraction: 1,
    },
  ]);
};
