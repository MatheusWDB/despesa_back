'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class despesas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  despesas.init({
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
  }, {
    sequelize,
    modelName: 'despesas',
  });
  return despesas;
};