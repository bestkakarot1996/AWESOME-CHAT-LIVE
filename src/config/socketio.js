
import passportSocketIo from "passport.socketio";

let  configSocketIo = (io, cookieParser, sessionStore) =>  {
  io.use(passportSocketIo.authorize({
    cookieParser: cookieParser,
    key: process.env.SESSION_KEY,
    secret: process.env.SESSION_SECRET,
    store: sessionStore,
    success: (data, accpect) => {
      if (!data.user.logged_in) { // người dùng chưa đăng nhập
        return accpect("Invalid User", false);
      }
      return accpect(null, true);
    },
    fail: (data, message, error, accept) => {
      if (error) {
        console.log("failed connection to socket.io:", message);
        return accept(new Error(message), false);
      }

    }
  }));
};



module.exports = configSocketIo;