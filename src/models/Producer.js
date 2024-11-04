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
    imagePath: {
        type: DataTypes.STRING(255),
        field: 'image_path',
    },
    addressId: {
        type: DataTypes.INTEGER,
        references: {
            model: Address,
            key: 'id',
        },
        field: 'address_id',
    },
}, {
    tableName: 'producer',
    timestamps: false,
});

Producer.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
Producer.belongsTo(Address, { foreignKey: 'address_id', as: 'address' });

module.exports = Producer;
