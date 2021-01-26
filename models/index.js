require("dotenv").config();

const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(process.env.DB_URL);

exports.loadModels = () => {
 const Actions = sequelize.define("Action", {
  id: {
   type: DataTypes.UUID,
   primaryKey: true
  },
  client: {
   type: DataTypes.STRING,
   allowNull: false
  },
  articleId: {
   type: DataTypes.UUID,
   allowNull: false
  }
 });

 const ModifiedActions = Object.assign(
  {
   like: (id, client, articleId) => {
    return Actions.create({ id, client, articleId });
   },
   unlike: id => {
    return Actions.destroy({ where: { id } });
   },
   isLikedByClient: async (clientId, articleId) => {
    const client = await Actions.findOne({ where: { clientId, articleId } });
    return !!client;
   },
   countByArticle: articleId => {
    return Actions.count({ where: { articleId } });
   }
  },
  Actions
 );

 const Comments = sequelize.define("Comment", {
  id: {
   type: DataTypes.UUID,
   primaryKey: true
  },
  articleId: {
   type: DataTypes.UUID,
   allowNull: false
  },
  name: {
   type: DataTypes.STRING,
   allowNull: false,
   defaultValue: "Anonymous"
  },
  content: {
   type: DataTypes.TEXT,
   allowNull: false,
   validate: {
    notEmpty: {
     msg: "Comment cannot be empty."
    }
   }
  },
  clientId: DataTypes.UUID
 });

 const ModifiedComments = Object.assign(
  {
   delete: id => Comments.destroy({ where: { id } }),
   findByArticle: articleId => Comments.findAll({ where: { articleId } })
  },
  Comments
 );

 const Reads = sequelize.define("Read", {
  articleId: DataTypes.UUID
 });

 const ModifiedReads = Object.assign(
  {
   read: articleId => Reads.create({ articleId }),
   count: articleId => Reads.count({ where: { articleId } })
  },
  Reads
 );

 return {
  actions: ModifiedActions,
  comments: ModifiedComments,
  reads: ModifiedReads
 };
};

exports.sequelize = () => sequelize;
