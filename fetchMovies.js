const axios = require('axios');
const db = require('./db');

const API_URL = 'http://www.omdbapi.com?apikey=7bbb7c99';

async function fetchMovies() {
    const keywords = [
        'Spiderman', 'Batman', 'Superman', 'Iron Man', // Superheroes
        'Avengers', 'X-Men', 'Wonder Woman', 'Captain America', // Marvel & DC
        'Matrix', 'Star Wars', 'Star Trek', 'Jurassic Park', // Sci-Fi & Action
        'Avatar', 'Inception', 'Interstellar', 'Gravity', // Sci-Fi & Space
        'Titanic', 'The Godfather', 'Forrest Gump', 'Pulp Fiction', // Classics
        'The Shawshank Redemption', 'Fight Club', 'The Dark Knight', 'Gladiator', // Iconic Films
        'Harry Potter', 'Lord of the Rings', 'The Hobbit', 'Narnia', // Fantasy
        'Frozen', 'Moana', 'Toy Story', 'Finding Nemo', // Animated
        'The Lion King', 'Shrek', 'Kung Fu Panda', 'Despicable Me', // Animated Films
        'The Hunger Games', 'Divergent', 'Maze Runner', 'Percy Jackson', // Dystopian & Adventure
        'The Matrix', 'Blade Runner', 'Minority Report', 'Terminator', // Cyberpunk
        'James Bond', 'Mission: Impossible', 'John Wick', 'Die Hard', // Action & Spy
        'Sherlock Holmes', 'The Da Vinci Code', 'Gone Girl', 'The Girl with the Dragon Tattoo', // Mystery & Thriller
        'La La Land', 'The Greatest Showman', 'A Star is Born', 'Chicago', // Musical & Romance
        'The Conjuring', 'Get Out', 'A Quiet Place', 'Hereditary', // Horror
        'Jumanji', 'Pirates of the Caribbean', 'Indiana Jones', 'National Treasure', // Adventure
            // Universal & Common Words
        'home', 'land', 'love', 'dream', 'life', 'time',
        'world', 'family', 'journey', 'secret', 'adventure',
        'city', 'night', 'day', 'fear', 'hope', 'war',
        'battle', 'hero', 'quest', 'mission', 'escape',
        'legend', 'mystery', 'power', 'truth', 'courage',
        'destiny', 'magic', 'dark', 'light', 'friendship',
        'betrayal', 'revenge', 'hero', 'enemy', 'victory',
        'future', 'past', 'present', 'love', 'hate', 'betrayal'
    ];

    for (const keyword of keywords) {
        try {
            const response = await axios.get(`${API_URL}&s=${encodeURIComponent(keyword)}`);
            const movies = response.data.Search; // Adjust based on API response

            if (movies && Array.isArray(movies)) {
                movies.forEach((movie) => {
                    const { Title: title, Year: release_year, Poster: img_url } = movie;
                    const rating = null; // You can fetch ratings separately if needed

                    // Validation checks
                    if (title && title.trim() !== '' && release_year && release_year.trim() !== '' && img_url && img_url.trim() !== '') {
                        db.query(
                            'INSERT INTO movies (title, release_year, img_url, rating) VALUES (?, ?, ?, ?)',
                            [title, release_year, img_url, rating],
                            (err, results) => {
                                if (err) {
                                    console.error('Error inserting movie:', err);
                                    return;
                                }
                                console.log('Movie inserted with ID:', results.insertId);
                            }
                        );
                    } else {
                        console.log('Skipping movie with invalid data:', movie);
                    }
                });
            }
        } catch (error) {
            console.error('Error fetching movies:', error);
        }
    }
}

module.exports = fetchMovies;