const User = require('../models/user');

const express = require('express');
const app = express;
const httpStatus = require('http-status');

app.get('/login', async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: 'Please provide' });
    }
    try {
        const user = await User.find({ username });
        if (!user) {
            return res.status(httpStatus)
            return res.status(httpStatus.NOT_FOUND).json({ message: 'User not found' });
        }
    }
    catch (e) {
        res.send("some error occured");
    }
})
app.post('/register',async(req, res) => {
    const { username, password } = req.body;
    try {
        // Checking for the existance of the user in db
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.state(httpStatus.FOUND).json({ message: 'User already exists' });
        }
        let newUser = new User({ username });
        User.register(newUser, password);
        req.flash('success', 'welcome to Lets Talk Platform');
        res.status(httpStatus.CREATED).json({ message: 'user registered' });
    }
    catch (e) {
        res.json({ message: `something wend wrong ${e}` });
    }
})