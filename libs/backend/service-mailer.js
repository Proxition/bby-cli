const mailer = `
const nodemailer = require('nodemailer');

const config = {
    senderAdress: process.env.MAIL_SENDER,
    port: 465, //process.env.MAIL_PORT || 465,
    secure: true, //false, // true for 465, false for other ports
    host: process.env.MAIL_SMTP_HOST,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD
    }
}

module.exports = {
    sendMail(receiver, subject, text, attachments) {
        return new Promise((resolve, reject) => {
            let callback = (error, info) => {
                if (error) reject(error);
                if (config.host === "smtp.ethereal.email") // dev only
                    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
                resolve(info);
            }
            let transporter = nodemailer.createTransport(config);

            let mailOptions = {
                from: config.senderAdress,
                to: receiver,
                subject: subject,
                text: (text.text) ? text.text : (typeof (text) === "string" ? text : ""),
                html: (text.html ? text.html : undefined),
                attachments: attachments
            };

            transporter.sendMail(mailOptions, callback);
        })
    },
    isValidMailAdress(mailAdress) {
      if (typeof mailAdress !== 'string') return false
      return Boolean(mailAdress.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,}$/i))
  }
}
`
const dotenvExtension = `
MAIL_SENDER=
MAIL_PORT=
MAIL_SMTP_HOST=
MAIL_USER=
MAIL_PASSWORD=
`
module.exports = {
  dotenvExtension,
  mailer
}
