const nodemailer=require("nodemailer")
const mailTransport =nodemailer.createTransport({
    host: process.env.SMPT_HOST,
    port: process.env.SMPT_PORT,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMPT_PASSWORD
    }
});
module.exports=mailTransport;