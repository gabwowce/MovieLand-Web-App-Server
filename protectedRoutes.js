const express = require('express');
const authenticateToken = require('./authMiddleware');
const router = express.Router();

// Pavyzdys: Apsaugotas maršrutas
router.get('/protected', authenticateToken, (req, res) => {
    res.json({ message: 'This is a protected route', user: req.user });
});

module.exports = router;
