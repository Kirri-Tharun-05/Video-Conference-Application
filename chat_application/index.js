const express=require('express');
const { createServer } = require('http');
const {Server}= require('socket.io');

const path=require('path');

const app =express();
const server=createServer(app);
const io=new Server(server);

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname, "index.html"));
});

io.on('connection',(socket)=>{
    console.log('a user connected');
    socket.on('chat message',(msg)=>{
        console.log('message : '+msg);
    })
    // socket.on('disconnect', () => {
    //     console.log('user disconnected');
    //   });
})
io.emit('hello','world');

io.on('connection',(socket)=>{
    socket.broadcast.emit('hi');
})
io.on('connection',(socket)=>{
    socket.on('chat message',(msg)=>{
        io.emit('chat message',msg);
    })
})

server.listen(3000,()=>{
    console.log('listening to port 3000');
})