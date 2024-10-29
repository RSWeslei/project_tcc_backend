const { DataTypes } = require('sequelize');
const sequelize = require('../configs/db');

const Address = sequelize.define('Address', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    street: {
        type: DataTypes.STRING,
    },
    number: {
        type: DataTypes.INTEGER,
    },
    complement: {
        type: DataTypes.STRING,
    },
    city: {
        type: DataTypes.STRING,
    },
    state: {
        type: DataTypes.STRING(2),
    },
    postalCode: {
        type: DataTypes.STRING,
        field: 'postal_code',
    },
    longitude: {
        type: DataTypes.DECIMAL(8, 6),
    },
    latitude: {
        type: DataTypes.DECIMAL(8, 6),
    },
    region: {
        type: DataTypes.STRING,
    },
}, {
    tableName: 'address',
    timestamps: false,
});

module.exports = Address;
