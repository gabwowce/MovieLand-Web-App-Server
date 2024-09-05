const { DataTypes } = require('sequelize');
const sequelize = require('sequelize');
const Movie = require('./Movie');
const User = require('../auth/User');

const Favorite = sequelize.define('Favorite',{
  id:{
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_id:{
    type: DataTypes.INTEGER,
    allowNull: false,
    references:{
      model: User,
      key: 'id'
    }
  },
  movie_id:{
    type: DataType.INTEGER,
    allowNull: false,
    references:{
      model: User,
      key: 'id'
    }
  },
  created_at:{
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
},{
  tableName: 'Favorites',
  timestamps: false,
  indexes:[{
        unique: true,
    fields:['user_id','movie_id']
    }
  ]
});

module.export = Favorite;
