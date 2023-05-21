const accountModel = require('./account.model');

module.exports = {
  async save(req, res) {
    const { uid, displayName, stsTokenManager, profanity, anonymous } =
      req.body;

    const payload = {
      uid: uid,
      displayName: displayName,
      userToken: '',
      profanity: profanity || 't',
      anonymous: anonymous || 'f',
    };

    await accountModel.create(payload);

    res.send(JSON.stringify(payload));
  },

  async getUser(req, res) {
    const uid = req.query.q || req.body.uid;

    let user;
    user = await accountModel.getUserByUID(uid);
    if (!user) user = { uid: '' };
    res.send(JSON.stringify(user));
  },

  async updatePreferences(req, res) {
    const uid = req.query.fb_uid;
    const displayName = req.query.displayName;
    const profanity = req.query.profanity;
    const anonymous = req.query.anonymous;

    const payload = {
      uid: uid,
      displayName: displayName,
      profanity: profanity,
      anonymous: anonymous,
    };

    await accountModel.setUserPreferences(payload);

    let user;
    user = await accountModel.getUserByUID(payload.uid);
    res.send(JSON.stringify(user));
  },
};
