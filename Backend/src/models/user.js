const mongoose = require('mongoose');
const {Schema} = mongoose;

const user=new Schema({
    username :String,
    email:String,
    password:String
})

const User =mongoose.model('User',user);

const user1 =new User({
    username:'Tharun',
    email:'tharunprajitha2017@gmail.com',
    password:'1234'
})
user1.save();

module.exports=User;