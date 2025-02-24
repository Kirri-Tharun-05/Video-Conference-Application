const express =require('express');
const app=express();
const PORT =8080;
const mongoose =require('mongoose');
const User= require('./src/models/user');
main()
.then(()=>{console.log('connection successful');})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/videocall');
}

// const user1 =new User({
//     username:'Tharun',
//     email:'tharunprajitha2017@gmail.com',
//     password:'1234'
// })
// user1.save();

app.get('/',(req,res)=>{
    res.send("At Home Route");
})
app.listen(PORT,(req,res)=>{
    console.log(`Listening to the port ${PORT}`);    
})