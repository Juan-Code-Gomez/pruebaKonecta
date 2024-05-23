const { Sequelize } = require('sequelize')
const sequelize = new Sequelize(process.env.DATABASE_URL);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require('./user')(sequelize, Sequelize);
db.Employee = require('./employee')(sequelize, Sequelize.DataTypes);
db.Request = require('./request')(sequelize, Sequelize.DataTypes);

Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });

module.exports = db;