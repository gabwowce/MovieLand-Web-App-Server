require('dotenv').config();
const User = require('../auth/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); 

// Registracijos funkcija
exports.register = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        // Patikrina, ar el. paštas jau naudojamas
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already in use' });
        }

        // Slaptažodžio hash'avimas
        const password_hash = await bcrypt.hash(password, 10);

        // Naujo vartotojo kūrimas
        const newUser = await User.create({ username, email, password_hash });

        res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Prisijungimo funkcija
exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        // Ieško vartotojo pagal el. paštą
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Patikrina slaptažodį
        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Sukuria JWT žetoną
        const jwtSecret = process.env.JWT_SECRET;
        const token = jwt.sign({ id: user.id }, jwtSecret, { expiresIn: '1h' });


        // Grąžina žetoną vartotojui
        res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'Strict' });
        res.status(200).json({ message: 'Logged in successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Logout funkcija
exports.logout = (req, res) => {
    res.clearCookie('token'); // Pašalina cookie
    res.status(200).json({ message: 'Logged out successfully' });
};
