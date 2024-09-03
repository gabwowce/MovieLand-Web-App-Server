const db = require('./db');

function getMovies(callback){
    db.query('SELECT * FROM movies', (err,results)=>{
        if(err){
            console.error('Error fetching movies:', err);
            callback(err, null);
            return;
        }
        callback(null,results);
    })
}
module.exports = getMovies;