const express = require('express');
const router = express.Router();
const authenticateToken = require('../auth/authMiddleware');

router.get('/current-user', authenticateToken, async (req,res)=>{
  try{
    const user = await User.findByPk(userId);
    if(!user) return res.sendStatus(404);

    res.json({user: {id: user.id, username: user.username, email: user.email}});
  }catch(error){
    res.status.(500).json({error: error.message});
  }
});

module.export = router;
