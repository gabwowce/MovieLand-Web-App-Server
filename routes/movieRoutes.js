const express = require('express');
const router = express.Router();

// to get all movies
router.get('/', async (req,res)=>{
  try{
    const movies = await Movie.findAll();
    res.json(movies);
  }catch(error){
    res.status(500).json({error: 'Failed to fetch movies'});
  }
})

// to get movies by year/category
router.get('/filter' async(req,res)=>{
  const {year, category} = req.query;

  const whereClause = {};
  if(year) whereClause.release_year = year;
  if(category) whereClause.category = category
  try{
    const movies = await Movie.findAll({where: whereClause});
    res.json(movies);
  }catch(error){
    res.status(500).json({error: 'Failed to fetch movies by filter'});
  }
})

module.exports = router;
