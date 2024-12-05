const { Sequelize } = require('sequelize');

//initialize sequelize 
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './sqliteDB/database.sqlite', 
  logging: false, //for debugging
});

//connecting
sequelize
  .authenticate()
  .then(() => console.log('Database connected successfully'))
  .catch((err) => console.error('Unable to connect to database:', err));

module.exports = sequelize;
