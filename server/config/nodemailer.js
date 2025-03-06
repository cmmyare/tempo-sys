import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.DB_USER, // env gaaga ku badalo
        pass: process.env.DB_PASSWORD // env gaaga ku badalo
    }
});

export default transporter;
