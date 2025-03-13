const Meeting = require('../models/meeting');
const User = require('../models/user.js');
const httpsStatus = require('http-status');
const router = require("express").Router();


const getUserHistory = async (req, res) => {
    try {
        const user = await User.findById(req.session.passport.user);
        console.log('from History.js : ', user);
        const meetings = await Meeting.find({ user_id: user.username });
        res.json(meetings);
    } catch (e) {
        res.json({ message: `someting went wrong ${e}` });
    }
}

const addToHistory = async (req, res) => {
    const { meeting_code } = req.body;
    try {
        const user = await User.findById(req.session.passport.user);
        const newMeeting = new Meeting({
            user_id: user.username,
            meeting_code: meeting_code
        })
        await newMeeting.save();
        res.status(httpStatus.CREATED).json({ message: 'Added code to history' });
    } catch (e) { res.json({ message: 'Someting went wrong' }) }
}

router.get('/addHistory',(req,res)=>{
    console.log(req.body);
})

module.exports= { getUserHistory, addToHistory };