'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tbl_transactions', {
      trans_id: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      user_id: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: 'tbl_users',
          key: 'user_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      payment_id: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: 'tbl_payments',
          key: 'payment_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      reservation_id: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: 'tbl_reservations',
          key: 'reservation_id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      trans_date: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('tbl_transactions');
  }
};