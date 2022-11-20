const socketServer = (socket, eventIo) => {
  console.log('socket - hihi');
  socket.emit('message', 'hihi');

  // join room conversations
  eventIo.on('Join-Room-Conversation', (data) => {
    console.log(`join room ${data}`);
    socket.join(`room-conversation-${data}`);
  });

  // new message
  eventIo.on('new-message', (data) => {
    socket.to(`room-conversation-${data.conversation_id}`).emit('new-message', data);
  });

  socket.on('disconnect', () => {
    console.log(`disconnect ${socket.id}`); // the Set contains at least the socket ID
    // eventIo.removeAllListeners();
  });
};

module.exports = socketServer;
