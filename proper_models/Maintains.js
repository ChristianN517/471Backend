const { DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {

const Maintains = sequelize.define('Maintains', {
  AdminEmployeeID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Admins',
      key: 'EmployeeID',
    },
    primaryKey: true,
  },
  CourseCode: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: 'Courses',
      key: 'CourseCode',
    },
    primaryKey: true,
  },
}, {
  tableName: 'Maintains',
  timestamps: false,
});

return Maintains;

};
