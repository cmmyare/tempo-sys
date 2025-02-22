import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.DB_USER,
        pass: process.env.DB_PASSWORD
    }
});

export default transporter;
