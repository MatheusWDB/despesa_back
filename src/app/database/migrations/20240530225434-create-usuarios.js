'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('usuarios', {
      idUsuario: {        
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      nome: {        
        allowNull: false,        
        type: DataTypes.STRING
      },
      cpf: {              
        allowNull: false,        
        type: DataTypes.STRING,
        unique: true
      },
      email: {        
        allowNull: false,
        type: DataTypes.STRING,
        unique: true
      },
      telefone: {        
        allowNull: false,
        type: DataTypes.STRING,
        unique: true
      },
      dataNascimento: {        
        allowNull: false,
        type: DataTypes.STRING
      },
      senha: {        
        allowNull: false,
        type: DataTypes.STRING
      },
      foto: {
        type: DataTypes.BLOB
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
    await queryInterface.dropTable('usuarios');
  }
};