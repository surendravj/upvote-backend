const socketIO = require('socket.io')
const { chat } = require('./chat')

let io

function initializeSocket (server) {
  io = socketIO(server)

  io.on('connection', socket => {
    chat.onUserDisconnected(socket,io)

    chat.onChat(socket,io)

    chat.onUserCountAdded(socket,io)

    
  })
}

const getIo = () => {
  if (!io) {
    throw new Error('Socket.IO not initialized');
  }
  return io;
};


module.exports = { initializeSocket, getIo }
