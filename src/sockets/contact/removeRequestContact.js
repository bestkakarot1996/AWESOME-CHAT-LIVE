import { pushSocketIdToArray, emitNotifiToArray, removeSocketIdToArray } from "./../../helpers/socketHelper";
/**
 * from socket.io init 
 * @param {*} io  // Có sẵn trong thư viện socket
 */
let removeRequestContact = (io) => {
  let clients = {};
  io.on("connection", (socket) => {
    pushSocketIdToArray(clients, socket.request.user._id, socket.id);

    socket.on("remove-request-contact", function (data) {
      console.log(data);
      console.log(socket.request.user);

      let currentUser = {
        id: socket.request.user._id
      };
      // gửi thông báo (khi user đang online )
      if (clients[data.contactId]) {
        emitNotifiToArray(clients, data.contactId, io, "response-remove-request-contact", currentUser);
      }
    });
    // xóa socketId dư thừa
    socket.on("disconnect", () => {
      clients = removeSocketIdToArray(clients, socket.request.user._id, socket);
    });
    console.log(clients);
  });
};

module.exports = removeRequestContact;