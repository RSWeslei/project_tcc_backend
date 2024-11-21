const { DataTypes } = require('sequelize');
const sequelize = require('../configs/db');

const Unit = sequelize.define('Unit', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
}, {
    tableName: 'unit',
    timestamps: false,
});

module.exports = Unit;
