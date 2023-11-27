/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const functions = require('firebase-functions');
const nodemailer = require('nodemailer');

// Configure your email transport
const mailTransport = nodemailer.createTransport({
    service: 'gmail', // or another email provider
    auth: {
        user: 'keshavbansal015@gmail.com',
        // pass: functions.config().gmail.password,
        pass: 'efqv koib dffx ttca',
    },
});

exports.sendWelcomeEmail = functions.auth.user().onCreate((user) => {
    const email = user.email; // The email of the user.
    const displayName = user.displayName || 'Valued User'; // The display name of the user.

    const mailOptions = {
        from: 'keshavbansal015@gmail.com',
        to: email,
        subject: 'Welcome to Our App!',
        text: `Hello ${displayName}! Welcome to our app. We hope you enjoy using it.`,
        // You can also use HTML for the email body
    };

    return mailTransport.sendMail(mailOptions)
        .then(() => {
            return console.log('Welcome email sent to:', email);
        })
        .catch((error) => {
            return console.error('There was an error while sending the email:', error);
        });
});
