const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Movie = require('Movie');
const User = require('../auth/User');

const Comment = sequelize.define('Comment',{
  id:{
    type: DataTypes.INTEGER,
    primaryKey: true,
    aytoIncrement: true
  },
  movie_id:{
    type: DataTypes.INTEGER,
    allowNull: false,
    references:{
      model: Movie,
      key: 'id'
    }
  },
  user_id:{
    type: DataTypes.INTEGER,
    allowNull: false,
    references:{
      model: User,
      key: 'id'
    }
  },
  comment:{
    type: DataTypes.TEXT,
    allowNull: false
  },
  created_at:{
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'comments',
  timestamps: false
});

module.exports = Comment;
