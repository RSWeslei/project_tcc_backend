const { DataTypes } = require('sequelize');
const sequelize = require('../configs/db');
const User = require('./User');
const Address = require('./Address');

const Producer = sequelize.define('Producer', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id',
        },
        field: 'user_id',
    },
    cpf: {
        type: DataTypes.STRING(14),
    },
    addressId: {
        type: DataTypes.INTEGER,
        references: {
            model: Address,
            key: 'id',
        },
        field: 'address_id',
    }
}, {
    tableName: 'producer',
    timestamps: false,
});

module.exports = Producer;
