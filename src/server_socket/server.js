const express = require('express')

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server)

app.use(express.json());

server.listen(8080, () => {
  console.log('listening on http://localhost:8080');
})

const rooms = new Map();

// app.get('/rooms/:id', (req, res) => {
//   const { id: chatID } = req.params;
//
//   let new_rooms = [...rooms.values()];
//   new_rooms.forEach((room, index) =>
//     new_rooms[index] = ({...room, users: [...room.users.values()]})
//   )
//
//   const obj = rooms.has(chatID)
//     ? {
//         rooms: new_rooms,
//       }
//     : {
//         rooms: [],
//       }
//   res.json(obj);
// })

app.post('/rooms', (req, res) => {
  const {username, chatID} = req.body;

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

io.on('connection', (socket) => {
  console.log('user connected: ', socket.id);
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
    if(![...rooms.get(chatID).users].find(user => user[1].name === username))
      rooms.get(chatID).users.set(socket.id, {name: username, isOnline: true});

    console.log(`${username} присоединился к этому чату (${chatID})!`);

    io.sockets.emit('A_JOINED_CHAT', transformList(rooms));
  })
  socket.on('A_SEND_MESSAGE', ({ chatID, messages }) => {
    chatID = String(chatID);
    rooms.get(chatID).messages = messages;
    rooms.get(chatID).lastMSG = messages[messages.length-1].user_message;
    const message_data = messages[messages.length-1];
    console.log(`Новое сообщение: ${message_data.user_message} от ${message_data.user_name}`);
    io.sockets.in(chatID).emit('A_SET_MESSAGES', transformList(rooms));
  })
  socket.on('disconnect', () => {
    rooms.forEach((value, chatID) => {

      if(value.users.get(socket.id) && value.users.get(socket.id).isOnline) {
        value.users.get(socket.id).isOnline = false
        console.log('user disconnected: ', socket.id);
      }
    })
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
