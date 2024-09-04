const { Sequelize } = require('sequelize');

// Sukurkite Sequelize instanciją
const sequelize = new Sequelize('movielandb', 'root', '12301', {
  host: 'localhost',
  dialect: 'mysql'
});

sequelize.authenticate()
  .then(() => {
    console.log('Connection to the database has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = sequelize;
