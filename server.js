const express = require('express');
const cors = require('cors');
const fetchMovies = require('./fetchMovies');
const getMovies = require('./getMovies');
const getMoviesByYear = require('./getMoviesByYear');
const getBestMoviesByYearAndCategory = require('./getMoviesByYearAndCategory')
const authRoutes = require('./auth/authRoutes');
const User = require('./auth/User');
const protectedRoutes = require('./protectedRoutes');
const authenticateToken = require('./auth/authMiddleware')


const app = express();
const PORT = process.env.PORT || 3002;

app.use(cors());
app.use(express.json());
// app.get('/fetch-movies', (req, res) => {
//   fetchMovies();
//   res.send('Fetching movies...');
// });

// fetchMovies().then(() => {
//   console.log('Movies fetching completed.');
//   process.exit(); 
// });

app.use('/auth', authRoutes);
app.use('/api', protectedRoutes);

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

// Endpointas, kuris grąžina vartotojo informaciją
app.get('/api/current-user', authenticateToken, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id); // Gauti vartotoją pagal ID iš JWT
    if (!user) return res.sendStatus(404); // Jei vartotojas nerastas

    res.json({ user: { id: user.id, username: user.username, email: user.email } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});




  
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
  
