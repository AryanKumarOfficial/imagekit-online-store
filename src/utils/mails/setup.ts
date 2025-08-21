import nodemailer from "nodemailer";

const configOptions = {
    service: "Gmail",
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASSWORD,
    }
}

const transporter = new nodemailer.createTransport(configOptions);

export {transporter}