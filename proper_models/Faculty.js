const { DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
const Faculty = sequelize.define('Faculty', {
    FacultyID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    Name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return Faculty;
};
  