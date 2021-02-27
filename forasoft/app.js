const ROOM1 = "ROOM1";
const ROOM2 = "ROOM2";
const ROOM3 = "ROOM3";

let express = require('express'); // объявляем константу с express
let app = express(); // объявляем константу с приложением
let server = require('http').createServer(app); // объявляем константу с сервером
let io = require('socket.io'); // объявляем константу с socket.io
io = new io.Server(server);


server.listen(3000, () => {
  console.log('listening on http://localhost:3000');
}); // Открываем прослушку на порт 3000

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html'); // при открытии страницы / - вернуть index.html
})

// let users = []; // Массив пользователей
let connections = []; // Массив подключённых

io.on("connection", (socket) => {
  console.log("Успешное соединение!");

  socket.join('Room1');

  connections.push(socket); // Добавление нового подключения в массив

  socket.on("disconnect", () => {
    console.log("Отключение!");
    connections.splice(connections.indexOf(socket), 1); // можно упростить      Удаление ушедшего из массива
  })
  // Принимаем метод отправки сообщения
  socket.on("send message", (data) => {
    // Объявляем метод добавления сообщения
    io.to('Room1').emit('add message', {
      // имя пользователя
      name: data.name,
      // сообщение пользователя
      message: data.message,
      // время отправки сообщения
      time: data.time
    });
  })
})
