const express = require('express')

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.use(express.json());

server.listen(8080, () => {
  console.log('listening on http://localhost:8080');
})

const rooms = new Map();

app.post('/rooms', (req, res) => {
  const {chatID} = req.body;

  if(!rooms.has(chatID)) {
    rooms.set(
      chatID,
      {
        chatID: Number(chatID),
        users: new Map(),
        messages: [],
      }
      );
  }
  res.send(rooms);
})

app.get('/rooms/', (req, res) => {
  const {username, chatID} = req.query;
  const dataRoom = rooms.get(chatID);



  if(dataRoom) {
    const users = [...dataRoom.users];
    console.log(users);
    const userCurrent = users.find(user => user.name === username);
    console.log(userCurrent);

  }
  // if(dataRoom) {
  //   console.log(dataRoom);
  //   io.sockets.emit('A_JOINED_CHAT_LINK', transformListRoom(dataRoom));
  // }
  res.send(chatID);
})



io.on('connection', (socket) => {
  console.log('user connected: ', socket.id);
  socket.emit('LOGIN', transformList(rooms));
  socket.on('A_JOIN_CHAT', ({ chatID, username }) => {
    chatID = String(chatID);
    socket.join(chatID);

    rooms.forEach(room => {
      if(room.users.size) {
        let id = [...room.users].find(user => user[1].name === username && !user[1].isOnline);
        if(id) {
          id = id[0];
          room.users.delete(id); // Удаляет его
          room.users.set(socket.id, {name: username, isOnline: true}); // добавляет снова с isOnline true
        }
      }
    })

    // Если пользователя с таким именем не нашли в данной комнате, то добавляем
    if(rooms.get(chatID))
      if(![...rooms.get(chatID).users].find(user => user[1].name === username))
        rooms.get(chatID).users.set(socket.id, {name: username, isOnline: true});



    console.log(`${username} присоединился к этому чату (${chatID})!`);

    io.sockets.in(chatID).emit('A_JOINED_CHAT', transformListRoom(rooms.get(chatID)));
  })
  socket.on('A_SEND_MESSAGE', ({ chatID, messages }) => {
    chatID = String(chatID);
    rooms.get(chatID).messages = messages;
    rooms.get(chatID).lastMSG = messages[messages.length-1].user_message;
    const message_data = messages[messages.length-1];
    console.log(`Новое сообщение: ${message_data.user_message} от ${message_data.user_name}`);

    io.sockets.in(chatID).emit('A_SET_MESSAGES', transformListRoom(rooms.get(chatID)));
  })

  socket.on('A_JOINED_CHAT_LINK', ({chatID}) => {
    socket.join(chatID);

    if(rooms.get(chatID)) {
      socket.emit('A_JOINED_CHAT_LINK_SUCCESS', chatID);
      console.log('Такая комната есть')
    } else {
      socket.emit('A_JOINED_CHAT_LINK_ABORT');
      console.log('Такой комнаты нет');
    }
  })

  socket.on('disconnect', () => {
    rooms.forEach((value) => {

      if(value.users.get(socket.id) && value.users.get(socket.id).isOnline) {
        value.users.get(socket.id).isOnline = false
        console.log('user disconnected: ', socket.id);
      }
      const chatID = String(value.chatID);
      io.sockets.in(chatID).emit('A_ABANDONED_CHAT', transformListRoom(rooms.get(chatID)));
    })

    console.log(rooms);

    io.sockets.emit('A_SET_USERS', transformList(rooms));
  })
})

function transformList(rooms) {
  // Преобразование Map в массив
  let new_rooms = [...rooms.values()];
  new_rooms.forEach((room, index) =>
    new_rooms[index] = ({...room, users: [...room.users.values()]})
  )
  return new_rooms;
}

function transformListRoom(room) {
  return {...room, users: [...room.users.values()]}
}
