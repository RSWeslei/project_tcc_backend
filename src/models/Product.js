const { DataTypes } = require('sequelize');
const sequelize = require('../configs/db');
const Producer = require('./Producer');
const ProductType = require('./ProductType');
const Unit = require('./Unit')

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
        field: 'producer_id',
        references: {
            model: Producer,
            key: 'id',
        },
    },
    imagePath: {
        type: DataTypes.STRING(255),
        field: 'image_path',
    },
    typeId: {
        type: DataTypes.INTEGER,
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

Product.belongsTo(Producer, { foreignKey: 'producer_id', as: 'producer' });
Product.belongsTo(ProductType, { foreignKey: 'typeId', as: 'type' });
Product.belongsTo(Unit, { foreignKey: 'unitId', as: 'unit' });

module.exports = Product;
