import { pushSocketFromArray, emitNotifiToArray, removeSocketFromArray } from "./../../helpers/socketHelper";
/**
 * from socket.io init 
 * @param {*} io  // Có sẵn trong thư viện socket
 */
let removeRequestContactReceived = (io) => {
  let clients = {};
  io.on("connection", (socket) => {
    pushSocketFromArray(clients, socket.request.user._id, socket.id);

    socket.on("remove-request-contact-received", function (data) {
      let currentUser = {
        id: socket.request.user._id
      };
      // gửi thông báo (khi user đang online )
      if (clients[data.contactId]) {
        emitNotifiToArray(clients, data.contactId, io, "response-remove-request-contact-received", currentUser);
      }
    });
    // xóa socketId dư thừa
    socket.on("disconnect", () => {
      clients = removeSocketFromArray(clients, socket.request.user._id, socket);
    });
    // console.log(clients);
  });
};

module.exports = removeRequestContactReceived;