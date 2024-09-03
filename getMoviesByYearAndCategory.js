const db = require('./db');

function getBestMoviesByYearAndCategory(year, category, callback) {
    // Sukurkite pagrindinę SQL užklausą
    let sql = 'SELECT * FROM movies WHERE 1=1';
    const params = [];

    // Patikrinkite, ar metai yra pateikti ir pridėkite sąlygą
    if (year) {
        sql += ' AND year = ?';
        params.push(year);
    }

    // Patikrinkite, ar kategorija yra pateikta ir pridėkite sąlygą
    if (category) {
        sql += ' AND category = ?';
        params.push(category);
    }

    sql += ' ORDER BY rating DESC';

    // Išveskite SQL užklausą ir parametrus į konsolę
    console.log('SQL Query:', sql);
    console.log('Parameters:', params);

    // Atlikite užklausą su dinamiškai sukurta SQL užklausa ir parametrais
    db.query(sql, params, (err, results) => {
        if (err) {
            console.error('Error fetching movies:', err);
            callback(err, null);
            return;
        }
        // Išveskite užklausos rezultatus į konsolę
        console.log('Query Results:', results);
        callback(null, results);
    });
}

module.exports = getBestMoviesByYearAndCategory;
