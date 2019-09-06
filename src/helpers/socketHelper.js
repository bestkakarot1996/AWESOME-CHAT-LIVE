export let pushSocketIdToArray = (clients, userId, socketId) => {
  if (clients[userId]) { // đang tồn tại currentUserId, nghĩa là đang đăng nhập, thì push vào mảng
    clients[userId].push(socketId);
  }
  else {
    // chưa truy cập hoặc truy cập lần đầu thì khởi tạo currentUserId 
    clients[userId] = [socketId];
  }
  return clients;
};

export let emitNotifiToArray = (clients, userId, io, eventName, data) => {
  clients[userId].forEach(socketId => {
    return io.sockets.connected[socketId].emit(eventName, data); // server gửi về 
  });
};

export let removeSocketIdToArray = (clients, userId, socket) => {
  clients[userId] = clients[userId].filter((socketId) => {
    // socketId phải khác với socket.id (id hiện tại)
    return socketId !== socket.id;
  });
  // khi người dùng thoát hoàn toàn (không tồn tại) thì xóa hết mảng đi
  if (!clients[userId].length) {
    delete clients[userId];
  }
  return clients;
};

