const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Movie = require('./Movie');
const U*ser = require('../auth/User');

const Rating = sequelize.define('Rating', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  movie_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references:{
      model: Movie,
      key: 'id'
    }
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references:{
      model: User,
      key: 'id'
    }
  },
  rating:{
    type: DataTypes.DECIMAL(2,1),
    allowNull: false
  },
  created_at:{
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'rating',
  timestamps: false
});

module.exports = Rating;
