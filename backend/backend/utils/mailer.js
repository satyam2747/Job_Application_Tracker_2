require('dotenv').config();

const nodemailer = require('nodemailer');

const smtp = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: +process.env.SMTP_PORT,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

module.exports = function notify(email, { company, role, oldStatus, newStatus }) {
  smtp.sendMail({
    from: process.env.SMTP_FROM,
    to: email,
    subject: `Update on ${company} - ${role}`,
    text: `Your application changed from "${oldStatus}" to "${newStatus}".`
  }).catch(console.error);
};
