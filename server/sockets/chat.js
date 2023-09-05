

exports.chat = {

  onChat: (socket,io) => {
    socket.on('chat', payload => {
      io.emit('chat', payload)
    })
  },

  onUserCountAdded: (socket,io) => {
    socket.on('get user count', () => {
      const userCount = io.engine.clientsCount
      io.emit('user count', userCount)
    })
  },

  onUserDisconnected: (socket,io) => {
    socket.on('disconnect', function () {
      const userCount = io.engine.clientsCount
      io.emit('user count', userCount)
    })
  }
}
