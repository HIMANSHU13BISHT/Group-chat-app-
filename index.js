// const app = require('express')();
const express = require('express');
const app = express();
const {createServer} = require('node:http');
const path = require('path');
const {Server} = require('socket.io');
app.use('/',express.static(path.join(__dirname,'public')));

// const http = require('http');
// const server = http.createServer(app);
// const socketio = require('socket.io');

const server = createServer(app);
const io = new Server(server);

const users ={};//username id as a key value pair
// const io = new socketio.Server(server);

io.on('connection',(socket)=> {
    console.log('User connected!!')
    socket.on('send-msg',(data)=> {
        io.emit('recieved-msg',{
            id:socket.id,
            msg:data.msg,
            username:users[socket.id]
        })
    })

    socket.on('login',(data)=> {
        users[socket.id] /*key*/= data.username;
    })
})

const PORT = process.env.PORT || 3000;
server.listen(PORT,()=> {
    console.log(`server is up at the port  http://localhost:3000`)
})