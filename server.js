const express = require('express');
const cors = require('cors');
const fetchMovies = require('./fetchMovies');
const getMovies = require('./getMovies');
const getMoviesByYear = require('./getMoviesByYear');
const getBestMoviesByYearAndCategory = require('./getMoviesByYearAndCategory')

const app = express();
const PORT = process.env.PORT || 3002;

app.use(cors());

// app.get('/fetch-movies', (req, res) => {
//   fetchMovies();
//   res.send('Fetching movies...');
// });

// fetchMovies().then(() => {
//   console.log('Movies fetching completed.');
//   process.exit(); 
// });



app.get('/movies', (req, res) => {
    getMovies((err, movies) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to fetch movies' });
      }
      res.json(movies);
      
    });
  });

  app.get('/movies/year/:year', (req, res) => {
    const { year } = req.params;
    getMoviesByYear(year, (err, movies) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to fetch movies by year' });
      }
      res.json(movies);
    });
  });

  app.get('/movies/filter', (req, res) => {
    const { year, category } = req.query; // Naudojame req.query, kad gautume užklausos parametrus

    getBestMoviesByYearAndCategory(year || null, category || null, (err, movies) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to fetch movies by filter' });
        }
        res.json(movies);
    });
});




  
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
  