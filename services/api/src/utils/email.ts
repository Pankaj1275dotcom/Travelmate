import nodemailer from "nodemailer";

const transporter =
    nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD,
        },
        connectionTimeout: 30000,
        greetingTimeout: 30000,
        socketTimeout: 30000,
    });

interface SendEmailOptions {
    to: string;
    subject: string;
    html: string;
}

export async function sendEmail(
    options: SendEmailOptions
) {
    await transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to: options.to,
        subject: options.subject,
        html: options.html,
    });
}