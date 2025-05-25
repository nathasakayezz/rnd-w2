'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Food extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Food.hasMany(models.Category, {foreignKey: "categoryId"})
    }
  }
  Food.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.INTEGER,
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate:{
        notNull:{
          msg: 'Category Null'
        },
        notEmpty:{
          msg:'Category Null'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Food',
  });
  return Food;
};