const { DataTypes } = require('sequelize');
const sequelize = require('../configs/db');
const Producer = require('./Producer');
const ProductType = require('./ProductType');

const Product = sequelize.define('Product', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING(400),
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
    },
    producerId: {
        type: DataTypes.INTEGER,
        references: {
            model: Producer,
            key: 'id',
        },
        field: 'producer_id',
    },
    imagePath: {
        type: DataTypes.STRING(255),
        field: 'image_path',
    },
    typeId: {
        type: DataTypes.INTEGER,
        references: {
            model: ProductType,
            key: 'id',
        },
        field: 'type_id',
    },
    status: {
        type: DataTypes.BOOLEAN,
    },
    pesticides: {
        type: DataTypes.BOOLEAN,
    },
}, {
    tableName: 'product',
    timestamps: false,
});

module.exports = Product;
