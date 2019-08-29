
/**
 * from socket.io init 
 * @param {*} io  // Có sẵn trong thư viện socket
 */
let addNewContact = (io) => {
  io.on("connection", (socket) => {
    socket.on("add-new-contact", function (data) {
      console.log(data);
      console.log(socket.request.user);
      
    })
  });
};

module.exports = addNewContact;