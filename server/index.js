const { Server } = require("socket.io");

// Server is used for creating a server.

const io = new Server(8000,{
    cors:true,
}
);

// tracking who is in which room
const nameToSocketIdMap = new Map();
const socketIdToNameMap = new Map();

io.on("connection", (socket) => {
    console.log(`Socket connected: ${socket.id}`);
    socket.on('room:join', data =>{
       const { name, room } = data; 
       nameToSocketIdMap.set(name, socket.id);
       socketIdToNameMap.set(socket.id, name);
       io.to(room).emit('user:joined', {name, id: socket.id});
       socket.join(room); 
       io.to(socket.id).emit('room:join', data);
    })
})