const { Server } = require('socket.io');
const cors =require('cors');
let connections={};
let messages={};
let timeOnline={};

export const connectionToSocket =()=>{
    const io=new Server(server,{});

    io.on('connection',(socket)=>{
        socket.on('join-call',(path)=>{
            if(connections[path]===undefined){
                connection[path]=[]
            }
            connections[path]=push(socket.id);
            timeOnline[socket.id]=new Date();

            for(let a =0 ; a<connections[path].length;++a){
                io.to(connections[path][a]).emit('user-joined',socket.id,connections[path])
            }

            if(messages[path]!=undefined){
                for(let a=0;a<messages[path].length;++a)
                {
                    io.to(socket.id).emit('chat-message',messages[path][a]['data'],
                        messages[path][a]['sender'],message[path][a]['socket-id-sender'])
                }
            }
        });

        socket.on('signal',(toId,message)=>{
            io.to(id).emit('signal',socket.id,message);
        })

        socket.on('chat-message',(data,sender)=>{

        })  
        Socket.on('disconnect',()=>{

        })
    })

}