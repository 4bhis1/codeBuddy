const nodemailer = require("nodemailer");
const { google } = require("googleapis");
require("dotenv").config();

const oAuth2Client = new google.auth.OAuth2(
  process.env.NODEMAILER_CLIENT_ID,
  process.env.NODEMAILER_CLIENT_SECRET,
  process.env.NODEMAILER_REDIRECT_URI
);

oAuth2Client.setCredentials({
  refresh_token: process.env.NODEMAILER_REFRESH_TOKEN,
});

async function sendMail() {
  try {
    const accessToken = await oAuth2Client.getAccessToken();

    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "absk8634@gmail.com",
        clientId: process.env.NODEMAILER_CLIENT_ID,
        clientSecret: process.env.NODEMAILER_CLIENT_SECRET,
        refreshToken: process.env.NODEMAILER_REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });

    const mailOptions = {
      from: "Abhisehk <absk8634@gmail.com>",
      to: "4bhis1@gmail.com",
      subject: "Hello from gmail using API",
      text: "Hello from gmail email using API",
      html: "<h1>Hello from gmail email using API</h1>",
    };

    const result = await transport.sendMail(mailOptions);
    return result;
  } catch (error) {
    return error;
  }
}

sendMail()
  .then((result) => console.log("Email sent...", result))
  .catch((error) => console.log(error.message));
