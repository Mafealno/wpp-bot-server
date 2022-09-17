import nodemailer, { SentMessageInfo, Transporter } from "nodemailer";

let transporter : Transporter<SentMessageInfo>

export const createTransportMail = () : Transporter<SentMessageInfo> => {
    if(!transporter){
        try {
            transporter = nodemailer.createTransport({
                host: process.env.SMTP_HOST,
                port: process.env.SMTP_PORT,
                secure: false,
                auth: {
                    user: process.env.SMTP_USER,
                    pass: process.env.SMTP_PASS,
                },
                tls:{
                    rejectUnauthorized: false
                }
            } as unknown)
        } catch (error) {
            console.log(error)
        }
    }

    return transporter;
}


