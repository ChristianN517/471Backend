
const { DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
const SBelongF = sequelize.define('SBelongF', {
  UCID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Student',
      key: 'UCID',
    },
    primaryKey: true,
  },
  FacultyID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Faculty',
      key: 'FacultyID',
    },
    primaryKey: true,
  },
}, {
  tableName: 'SBelongF',
  timestamps: false,
});

return SBelongF;
};
