import addNewContact from "./contact/addNewContact";


/**
 * 
 * @param {*} io 
 */
let initSockets = (io) => {
  addNewContact(io);
  //
};

module.exports = initSockets;