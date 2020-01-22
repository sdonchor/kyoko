const nodemailer = require("nodemailer");
const configModule = require("../configs/config")


const sendmail = async function(subject, content){

  let config = configModule.getConfig('mailer');
  let mailer = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: false, 
    auth: config.auth
  });

    let info = await mailer.sendMail({
        from: config.sender,
        to: config.receivers.join(", "), //"bar@example.com, baz@example.com"
        subject: subject,
        text: content, 
      });
      console.log('sent mail');
}
module.exports = {
  sendmail
}