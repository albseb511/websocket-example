const express = require('express');
app = express();
const server = require('http').createServer(app);
const { Server } = require('socket.io');
const bodyParser = require('body-parser')

const {addUser, removeUser, getUser, getAllUsersInRoom} = require('./users.js')


app.use(express.urlencoded({extended: true}));
app.use(express.json());

let counts = {
   "all": 0
}

const io = new Server(server);
io.on('connection', client => {
   // * for an event named event
  client.on('join_room', data => { 
     console.log(`incoming request to join room:`,data)
      const { username, room } = data;
      const user = addUser({ id: client.id, name: username, room: room  });
      console.log(`addUser:`,user)
      if(user.error){
         console.log(user.error)
         client.emit('error', user.message);
         return
      }
      client.join(user.room);
      client.to(user.room).emit("room event", { user: user, message:"A new user has joined!" })
   });
   client.on("leave room",()=>{
      removeUser(client.id)
   })
   // * disconnect
  client.on('disconnect', () => { 
      console.log(`total left ${--counts.all}`);
      removeUser(client.id)
   });

   client.on("send message", data=>{
      const user = getUser(client.id);
      console.log(user,`is sending message`,data)
      io.to(user.room).emit("receive message", { message: data.message, username: user.name })
   })

   // 
   console.log('broadcasting, total connected:', ++counts.all)


   // * broadcasting to all users except the user
   client.broadcast.emit("notification",{id:client.id, type:"new-user"})


});

server.listen(5000)


// * rooms
// * 1
// * 2

// * no db
// * all users present in the room
// * add a user
// * remove a user
// * check if a user exists
// * get all users in a room

// * on connect setup events
// * join_room
// * send_message_to_room
// * disconnect