const express = require('express')

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server)

app.use(express.json());

server.listen(8080, () => {
  console.log('listening on http://localhost:8080');
})

const rooms = new Map();

app.get('/rooms', (req, res) => {
  res.json(rooms);
})

app.post('/rooms', (req, res) => {
  const {username, chatID} = req.body;

  if(!rooms.has(chatID)) {
    rooms.set(
      chatID,
      new Map([
      ['users', new Map()],
      ['messages', []],
    ]));
  }
  res.send(rooms);
})

io.on('connection', (socket) => {
  console.log('user connected: ', socket.id);
  socket.on('disconnect', () => {
    console.log('user disconnected: ', socket.id);
  })
})
