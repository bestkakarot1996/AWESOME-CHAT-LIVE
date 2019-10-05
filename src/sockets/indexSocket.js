import addNewContact from "./contact/addNewContact";
import removeRequestContactSent from "./contact/removeRequestContactSent";


/**
 * 
 * @param {*} io 
 */
let initSockets = (io) => {
  addNewContact(io);
  removeRequestContactSent(io);
};

module.exports = initSockets;