'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tbl_review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.tbl_users, {foreignKey: 'user_id'});
      this.belongsTo(models.tbl_reservations, {foreignKey: 'reservation_id'});
    }
  }
  tbl_review.init({
    review_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    user_id:{
      type: DataTypes.STRING,
      allowNull: false,
      references:{
        model: 'tbl_users',
        key: 'user_id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    rate: DataTypes.FLOAT,
    verbal: DataTypes.TEXT,
    archived:{
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    modelName: 'tbl_reviews',
    timestamps: true
  });
  return tbl_review;
};