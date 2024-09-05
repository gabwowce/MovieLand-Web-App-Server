//TODO reikia prideti papildomus stulpelius

const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Movie = sequelize.define('Movie', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  release_year: {
    type: DataTypes.INTEGER, // YEAR tipas nėra tiesiogiai palaikomas, tad naudokime INTEGER
    allowNull: false
  },
  img_url: {
    type: DataTypes.STRING,
    allowNull: true
  },
  rating: {
    type: DataTypes.DECIMAL(3,1),
    allowNull: true
  }
}, {
  tableName: 'movies',
  timestamps: false // Kadangi lentelėje nėra createdAt ir updatedAt
});

module.exports = Movie;
