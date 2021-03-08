const express = require('express')

const app = express(); // объявление приложения через фреймворк express
const server = require('http').createServer(app); // создание сервера
const io = require('socket.io')(server); // объявление переменной сокетов

app.use(express.json()); // запуск приложения

// установка прослушки сервера на порт 8080
server.listen(8080, () => {
  console.log('listening on http://localhost:8080');
})

// объявление переменной комнат
const rooms = new Map();

// запрос на создание новой комнаты
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

io.on('connection', (socket) => {
  console.log('user connected: ', socket.id);

  // после входа в приложение -> отправить ивент LOGIN
  socket.emit('A_LOGIN', transformList(rooms));

  // обработка события входа в чат
  socket.on('A_JOIN_CHAT', ({ chatID, username }) => {
    chatID = String(chatID);
    socket.join(chatID);

    // при повторном входе в приложение, поменять статус isOnline: false на true
    rooms.forEach(room => {
      if(room.users.size) {
        let id = [...room.users].find(user => user[1].name === username && !user[1].isOnline);
        if(id) {
          // получение id пользователя
          id = id[0];
          room.users.delete(id); // удаление пользователя с таким id
          room.users.set(socket.id, {name: username, isOnline: true}); // добавление снова с isOnline: true
        }
      }
    })

    // Если пользователя с таким именем не нашли в данной комнате, то добавляем
    if(rooms.get(chatID))
      if(![...rooms.get(chatID).users].find(user => user[1].name === username))
        rooms.get(chatID).users.set(socket.id, {name: username, isOnline: true});


    console.log(`${username} присоединился к этому чату (${chatID})!`);

    // отправка всем сокетам + мне события на присоединение к чату
    io.sockets.in(chatID).emit('A_JOINED_CHAT', transformListRoom(rooms.get(chatID)));
  })

  // обработка события отправки сообщения
  socket.on('A_SEND_MESSAGE', ({ chatID, messages }) => {
    chatID = String(chatID);
    rooms.get(chatID).messages = messages; // установка массива с сообщениями
    rooms.get(chatID).lastMSG = messages[messages.length-1].user_message; // установка последнего сообщения в чате
    const message_data = messages[messages.length-1];
    console.log(`Новое сообщение: ${message_data.user_message} от ${message_data.user_name}`);

    io.sockets.in(chatID).emit('A_SET_MESSAGES', transformListRoom(rooms.get(chatID)));
  })

  // обработка события присоединения пользователя по ссылке
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

  // обработка события выхода пользователя из приложения
  socket.on('disconnect', () => {
    rooms.forEach((value) => {

      if(value.users.get(socket.id) && value.users.get(socket.id).isOnline) {
        value.users.get(socket.id).isOnline = false
        console.log('user disconnected: ', socket.id);
      }
      const chatID = String(value.chatID);
      io.sockets.in(chatID).emit('A_ABANDONED_CHAT', transformListRoom(rooms.get(chatID)));
    })

    io.sockets.emit('A_SET_USERS', transformList(rooms));
  })
})

function transformList(rooms) {
  // Преобразование Map в массив. Преобразование всех комнат
  let new_rooms = [...rooms.values()];
  new_rooms.forEach((room, index) =>
    new_rooms[index] = ({...room, users: [...room.users.values()]})
  )
  return new_rooms;
}

function transformListRoom(room) {
  // Преобразование Map в массив. Преобразование одной комнаты
  return {...room, users: [...room.users.values()]}
}
