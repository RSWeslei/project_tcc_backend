const { DataTypes } = require('sequelize');
const sequelize = require('../configs/db');

const ProductType = sequelize.define('ProductType', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'product_type',
  timestamps: false,
});

module.exports = ProductType;
