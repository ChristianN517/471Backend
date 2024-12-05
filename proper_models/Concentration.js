const { DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
const Concentration = sequelize.define('Concentration', {
    ConcentrationID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    Name: {
        type: DataTypes.STRING,
        allowNull: false,  
    },
    ProgramID: {
        type: DataTypes.STRING,
        allowNull: false,  
    },
});

    return Concentration;
};

