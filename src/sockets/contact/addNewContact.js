import { pushSocketIdToArray, emitNotifiToArray, removeSocketIdToArray } from "./../../helpers/socketHelper";
/**
/**
 * from socket.io init 
 * @param {*} io  // Có sẵn trong thư viện socket
 */
let addNewContact = (io) => {
  let clients = {};
  io.on("connection", (socket) => {
    pushSocketIdToArray(clients, socket.request.user._id, socket.id);

    socket.on("add-new-contact", function (data) {
      // console.log(data);
      // console.log(socket.request.user);
      let currentUser = {
        id: socket.request.user._id,
        username: socket.request.user.username,
        avatar: socket.request.user.avatar,
        address: (socket.request.user.address !== null) ? socket.request.user.address : ""
      };
      if (clients[data.contactId]) {
        emitNotifiToArray(clients, data.contactId, io, "response-add-new-contact", currentUser);
      }
    });
    // xóa socketId dư thừa
    socket.on("disconnect", () => {
      clients = removeSocketIdToArray(clients, socket.request.user._id, socket);
    });
    console.log(clients);

  });
};

module.exports = addNewContact;