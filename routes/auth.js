// routes/auth.js
const express = require('express');
const router = express.Router();
const User = require('../models/user');
const upload = require('../middleware/upload');

// Registration Route
router.get('/register', (req, res) => {
    res.render('register');
});

router.post('/register', async (req, res) => {
    const { username, password } = req.body;

    const existingUser = await User.findOne({ username });
    if (existingUser) {
        return res.render('error', { errorMessage: 'Username is already taken. Please choose a different username.' });
    }

    const existingPassword = await User.findOne({ password });
    if (existingPassword) {
        return res.render('error', { errorMessage: 'Password is already used. Please choose a different password.' });
    }

    const user = new User({ username, password });
    await user.save();
    res.render('success');
});

// Login Route
router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
        return res.render('notRegistered');
    }
    if (user.password !== password) {
        return res.render('invalidCredentials');
    }
    res.render('successLogin', { uploadedImage: null });
});

// Image Upload Route
router.post('/upload', (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            res.render('successLogin', { uploadedImage: null, error: err });
        } else {
            if (req.file == undefined) {
                res.render('successLogin', { uploadedImage: null, error: 'No file selected!' });
            } else {
                res.render('successLogin', {
                    uploadedImage: `/uploads/${req.file.filename}`,
                    error: null
                });
            }
        }
    });
});

module.exports = router;
