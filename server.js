const express = require('express');
const cors = require('cors');

const authRoutes = require('./auth/authRoutes');
const movieRoutes = require('./routes/movieRoutes');
const protectedRoutes = require('./routes/protectedRoutes');


const app = express();
const PORT = process.env.PORT || 3002;

app.use(cors());
app.use(express.json());


app.use('/auth', authRoutes);
app.use('/api', protectedRoutes);
app.use('/movies', movieRoutes);


  
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
  
