const socketServer = (socket, eventIo) => {
  socket.on('disconnect', () => {
    console.log(`disconnect ${socket.id}`); // the Set contains at least the socket ID
  });
};

module.exports = socketServer;
