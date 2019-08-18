import nodeMailer from "nodemailer";

let adminEmail = process.env.MAIL_USER;
let adminPassword = process.env.MAIL_PASSWORD;
let mailHost = process.env.MAIL_HOST;
let mailPost = process.env.MAIL_POST;

let sendEmail = (to, subject, contentEmail) => {
  let transporter = nodeMailer.createTransport({
    host: mailHost,
    post: mailPost,
    secure: false, // user ssl http or https 
    auth: {
      user: adminEmail,
      pass: adminPassword
    }
  });
  let options = {
    from: adminEmail,
    to: to,
    subject: subject,
    html: contentEmail
  };
  return transporter.sendMail(options); // this defaule return a promise
};

module.exports = sendEmail;