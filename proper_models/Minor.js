const { DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
const Minor = sequelize.define('Minor', {
    MinorID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    Name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ProgramID: {
      type: DataTypes.STRING,
      references: {
        model: 'Programs',
        key: 'ProgramID',
      },
    },
  });
  return Minor;
};
  