'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class usuarios extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  usuarios.init({
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
    senha: {        
      allowNull: false,
      type: DataTypes.STRING
    },
    deletado: {
      allowNull: false,
      type: DataTypes.ENUM('V','F'),
      defaultValue: 'F'
    }
  }, {
    sequelize,
    modelName: 'usuarios',
  });
  return usuarios;
};