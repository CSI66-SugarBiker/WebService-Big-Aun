export function setupSocket(io) {
  io.on('connection', (socket) => {
    // client ส่ง branchId/orderId/queue มาขอ join room
    socket.on('join', (rooms) => {
      ([]).concat(rooms).forEach(r => socket.join(r));
    });

    socket.on('disconnect', () => {});
  });
}

// helper: emit event ไปยัง room
export function emitTo(io, room, event, payload) {
  io.to(room).emit(event, payload);
}
