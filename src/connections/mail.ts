import nodemailer, { TransportOptions } from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import smtp_config from "../../config/smtp";

let transporter : any

export const createTransportMail = () : nodemailer.Transporter<SMTPTransport.SentMessageInfo> => {
    if(!transporter){
        try {
            transporter = nodemailer.createTransport({
                host: smtp_config.host,
                port: 587,
                secure: false,
                auth: {
                    user: smtp_config.user,
                    pass: smtp_config.pass,
                },
                tls:{
                    rejectUnauthorized: false
                }
            })
        } catch (error) {
            console.log(error)
        }
    }

    return transporter;
}


