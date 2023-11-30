const admin = require("firebase-admin");
const nodemailer = require("nodemailer");
const functions = require("firebase-functions");
const config = functions.config;
const firestore = functions.firestore;
admin.initializeApp();

// Setting up Nodemailer with SMTP details
const transporter = nodemailer.createTransport({
  service: "gmail", // Replace with your email service
  auth: {
    user: config().gmail.email, // Set these in your Firebase config
    pass: config().gmail.password,
  },
});

exports.sendWelcomeEmail = firestore
  .document("users/{userId}")
  .onCreate((snap, context) => {
    const newUser = snap.data();
    const email = newUser.email; // Assuming email field exists
    const mailOptions = {
      from: config().gmail.email, // Replace with your email
      to: email,
      subject: "Welcome to Our App!",
      text: `Welcome ${newUser.name}! Thank you for joining us.`,
      // You can also use HTML for the body
    };

    return transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Error sending email", error);
        return false;
      }
      console.log("Email sent: " + info.response);
      return true;
    });
  });
