import nodemailer from "nodemailer";

export interface Options {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 465,
  auth: {
    user: "everistusnwogo@gmail.com", // your email address
    pass: "mnq6Q49t52Ow3FzJ", // your email password or app-specific password
  },
});

export async function sendMail(options: Options) {
  const mailOptions = {
    from: "no_reply@cetirc.com", // sender address
    to: options.to, // list of receivers
    subject: options.subject, // Subject line
    html: options.html, // html body (optional)
    text: options.text,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
  } catch (error) {
    console.error("Error sending email: " + error);
  }
}
