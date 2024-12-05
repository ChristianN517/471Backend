const { DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
const Major = sequelize.define('Major', {
    MajorID: {
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

  return Major;

};
  