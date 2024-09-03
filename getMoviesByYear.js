const db = require('./db');

function getMoviesByYear(year, callback) {
  const query = 'SELECT * FROM movies WHERE release_year = ?';
  db.query(query, [year], (err, results) => {
    if (err) {
      console.error('Error fetching movies by year:', err);
      callback(err, null);
      return;
    }
    callback(null, results);
  });
}

module.exports = getMoviesByYear;
