const messageModel = require('./message.model');

module.exports = {
  async getUnfiltered(req, res) {
    let msgTable = await messageModel.getAllMessages(false);
    let interactionsTable = await messageModel.getInteractions();
    res.status(200).send([[...msgTable], [...interactionsTable]]);
  },

  async getFiltered(req, res) {
    let msgTable = await messageModel.getAllMessages(true);
    let interactionsTable = await messageModel.getInteractions();
    res.status(200).send([[...msgTable], [...interactionsTable]]);
  },

  async save(req, res, next) {
    const {
      id,
      fb_uid,
      messagePlain,
      messageFilter,
      messageSize,
      uploadTime,
      likeCount,
    } = req.body;

    const payload = {
      id: id,
      fb_uid: fb_uid,
      messagePlain: messagePlain,
      messageFilter: messageFilter,
      messageSize: messageSize,
      uploadTime: uploadTime,
      likeCount: likeCount,
    };

    const profanity = req.body.profanity;
    await messageModel.create(payload);
    let postedMessage = await messageModel.getLastMessage(profanity);
    req.postedMessage = JSON.stringify(postedMessage[0]);
    next();
  },

  async upvote(req, res) {
    const msgID = req.query.id;
    const fb_uid = req.query.fb_uid;
    const filtered = req.query.filtered;

    const payload = {
      id: msgID,
      uid: fb_uid,
      filtered: filtered,
    };

    let msgTable = await messageModel.upvote(payload);

    res.status(200).send(JSON.stringify(msgTable));
  },
};
