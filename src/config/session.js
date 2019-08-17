import session from "express-session";
import connectMongo from "connect-mongo";
/**
 * 
 * @param {*} app  from exactly app config
 */
let MongoStore = connectMongo(session);
/**
 * This variable is the session store
 */
let sessionStore = new MongoStore({
  url: `${process.env.DB_CONNECT}://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
  autoReconnect: true,
  //autoRemove: "native" // remove session when cookie expired 1day
});
// save data users enter in session 
let configSession = (app) => 
{
app.use(session({
  key: "express.sid",
  secret: "mySecret",
  store : sessionStore,
  resave: true,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 // = 864000s ~ 1day
  }
}))
};

module.exports = configSession;