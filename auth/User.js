//npm install sequelize mysql2 bcrypt
const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('./db');

const User = sequelize.define('User',{
  id:{
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncreament: true
  },
  username:{
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  email:{
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate:{
      isEmail: true
    }
  },
  password_hash{
    type: DataTypes.STRING,
    allowNull: false
  },
  created_at:{
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
},{
  timestamps: false,
  tableName: 'users'
});

module.exports = User;
