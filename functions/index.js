import { config, firestore } from 'firebase-functions';
import { initializeApp } from 'firebase-admin';
import { createTransport } from 'nodemailer';
initializeApp();

// Setting up Nodemailer with SMTP details
const transporter = createTransport({
    service: 'gmail', // Replace with your email service
    auth: {
        user: config().gmail.email, // Set these in your Firebase config
        pass: config().gmail.password,
    },
});

export const sendWelcomeEmail = firestore
    .document('users/{userId}')
    .onCreate((snap, context) => {
        const newUser = snap.data();
        const email = newUser.email; // Assuming email field exists
        const mailOptions = {
            from: config().gmail.email, // Replace with your email
            to: email,
            subject: 'Welcome to Our App!',
            text: `Welcome ${newUser.name}! Thank you for joining us.`,
            // You can also use HTML for the body
        };

        return transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log('Error sending email', error);
                return false;
            }
            console.log('Email sent: ' + info.response);
            return true;
        });
    });
