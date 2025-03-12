import Meeting from '../models/meeting';
import User from '../models/user.js'
import httpStatus from 'http-status'
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

const addToHistory=async (req,res)=>{
    const {meeting_code}=req.body;
    try{
        const user= await User.findById(req.session.passport.user);
        const newMeeting= new Meeting ({
            user_id:user.username,
            meeting_code:meeting_code
        })
        await  newMeeting.save();
        res.status(httpStatus.CREATED).json({message:'Added code to history'});
    }catch(e){res.json({message:'Someting went wrong'})}

}

export {getUserHistory,addToHistory};