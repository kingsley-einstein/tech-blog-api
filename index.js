const { v4: uuid } = require("uuid");
const models = require("./models").loadModels();
const db = require("./models").sequelize();

db.sync({ force: false }).then(() => console.log("Synced with DB"));

exports.ping = async (req, res) => {
 try {
  if (req.method === "OPTIONS") {
   res.set("Access-Control-Allow-Origin", "*");
   res.set("Access-Control-Allow-Methods", "*");
   res.set("Access-Control-Allow-Headers", "Content-Type");
   return res.status(204).send("");
  }

  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "*");
  res.set("Access-Control-Allow-Headers", "Content-Type");

  return res.status(200).json({
   message: "HI"
  });
 } catch (error) {
  return res.status(500).json({
   err: error.message
  });
 }
};

exports.action = async (req, res) => {
 try {
  if (req.method === "OPTIONS") {
   res.set("Access-Control-Allow-Origin", "*");
   res.set("Access-Control-Allow-Methods", "*");
   res.set("Access-Control-Allow-Headers", "Content-Type");
   return res.status(204).send("");
  }

  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "*");
  res.set("Access-Control-Allow-Headers", "Content-Type");

  const isLiked = await models.actions.isLikedByClient(
   req.body.client,
   req.body.articleId
  );

  // res.header("Access-Control-Allow-Origin", "*");
  // res.header("Access-Control-Allow-Methods", "GET, POST");

  if (isLiked) {
   const count = await models.actions.unlike(
    req.body.client,
    req.body.articleId
   );
   return res.status(200).json({
    actionType: "unlike",
    data: count
   });
  }

  const like = await models.actions.like(
   req.body.id,
   req.body.client,
   req.body.articleId
  );

  return res.status(200).json({
   actionType: "like",
   data: { ...like }
  });
 } catch (error) {
  // console.log(error.message);
  return res.status(500).json({
   err: error.message
  });
 }
};

exports.countLikes = async (req, res) => {
 try {
  if (req.method === "OPTIONS") {
   res.set("Access-Control-Allow-Origin", "*");
   res.set("Access-Control-Allow-Methods", "*");
   res.set("Access-Control-Allow-Headers", "Content-Type");
   return res.status(204).send("");
  }

  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "*");
  res.set("Access-Control-Allow-Headers", "Content-Type");

  const likes = await models.actions.countByArticle(req.body.articleId);
  return res.status(200).json({
   data: likes
  });
 } catch (error) {
  return res.status(500).json({
   err: error.message
  });
 }
};

exports.isLiked = async (req, res) => {
 try {
  if (req.method === "OPTIONS") {
   res.set("Access-Control-Allow-Origin", "*");
   res.set("Access-Control-Allow-Methods", "*");
   res.set("Access-Control-Allow-Headers", "Content-Type");
   return res.status(204).send("");
  }

  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "*");
  res.set("Access-Control-Allow-Headers", "Content-Type");

  const liked = await models.actions.isLikedByClient(
   req.body.client,
   req.body.articleId
  );
  return res.status(200).json({
   data: liked
  });
 } catch (error) {
  return res.status(500).json({
   err: error.message
  });
 }
};

exports.addComment = async (req, res) => {
 try {
  if (req.method === "OPTIONS") {
   res.set("Access-Control-Allow-Origin", "*");
   res.set("Access-Control-Allow-Methods", "*");
   res.set("Access-Control-Allow-Headers", "Content-Type");
   return res.status(204).send("");
  }

  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "*");
  res.set("Access-Control-Allow-Headers", "Content-Type");

  const addedComment = await models.comments.create({
   ...req.body,
   id: uuid()
  });
  return res.status(200).json({
   data: addedComment
  });
 } catch (error) {
  return res.status(500).json({
   err: error.message
  });
 }
};

exports.findComments = async (req, res) => {
 try {
  if (req.method === "OPTIONS") {
   res.set("Access-Control-Allow-Origin", "*");
   res.set("Access-Control-Allow-Methods", "*");
   res.set("Access-Control-Allow-Headers", "Content-Type");
   return res.status(204).send("");
  }

  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "*");
  res.set("Access-Control-Allow-Headers", "Content-Type");

  const comments = await models.comments.findByArticle(req.body.articleId);
  return res.status(200).json({
   data: comments
  });
 } catch (error) {
  return res.status(500).json({
   err: error.message
  });
 }
};

exports.deleteComment = async (req, res) => {
 try {
  if (req.method === "OPTIONS") {
   res.set("Access-Control-Allow-Origin", "*");
   res.set("Access-Control-Allow-Methods", "*");
   res.set("Access-Control-Allow-Headers", "Content-Type");
   return res.status(204).send("");
  }

  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "*");
  res.set("Access-Control-Allow-Headers", "Content-Type");

  const deleted = await models.comments.delete(req.body.id);
  return res.status(200).json({
   data: deleted
  });
 } catch (error) {
  return res.status(500).json({
   err: error.message
  });
 }
};

exports.read = async (req, res) => {
 try {
  if (req.method === "OPTIONS") {
   res.set("Access-Control-Allow-Origin", "*");
   res.set("Access-Control-Allow-Methods", "*");
   res.set("Access-Control-Allow-Headers", "Content-Type");
   return res.status(204).send("");
  }

  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "*");
  res.set("Access-Control-Allow-Headers", "Content-Type");

  const data = await models.reads.read(req.body.articleId);
  return res.status(200).json({
   data
  });
 } catch (error) {
  return res.status(500).json({
   err: error.message
  });
 }
};

exports.countReads = async (req, res) => {
 try {
  if (req.method === "OPTIONS") {
   res.set("Access-Control-Allow-Origin", "*");
   res.set("Access-Control-Allow-Methods", "*");
   res.set("Access-Control-Allow-Headers", "Content-Type");
   return res.status(204).send("");
  }

  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "*");
  res.set("Access-Control-Allow-Headers", "Content-Type");

  const data = await models.reads.count(req.body.articleId);
  return res.status(200).json({
   data
  });
 } catch (error) {
  return res.status(500).json({
   err: error.message
  });
 }
};
