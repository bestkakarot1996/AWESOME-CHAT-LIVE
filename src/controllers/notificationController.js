import { notification } from "./../services/indexServices";

let readMore = async (req, res) => {
  try {
    let skipNumberNotification = +(req.query.skipNumber);
    let newNotifications = await notification.readMore(req.user._id, skipNumberNotification);
    return res.status(200).send(newNotifications);
  } catch (error) {
    return res.status(500).send(error);
  }
};



module.exports = {
  readMore: readMore
};




// let getReadMore = async (req, res) => {
//   try {
//     let skipNumberNotification = +(req.query.skipNumber); // chuyen string --> number console.log(typeof skipNumberNotfi);
//     console.log(skipNumberNotification);
//     console.log(typeof skipNumberNotification)
//     let newNotifications = await notification.readMore(req.user._id, skipNumberNotification);

//     return res.status(200).send(newNotifications);
//   } catch (error) {
//     return res.status(500).send(error);
//   }
// }