'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('despesas', {
      idDespesa: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      idUsuario: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'usuarios',
          key: 'idUsuario'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      valor: {
        allowNull: false,
        type: DataTypes.DECIMAL(15,2)
      },
      descricao: {
        type: DataTypes.STRING
      },
      origem: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      pago: {
        allowNull: false,
        type: DataTypes.ENUM('V','F'),
        defaultValue: 'F'
      },
      data: {
        allowNull: false,
        type: DataTypes.STRING
      },
      deletado: {
        allowNull: false,
        type: DataTypes.ENUM('V','F'),
        defaultValue: 'F'
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('despesas');
  }
};