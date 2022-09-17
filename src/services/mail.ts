import { createTransportMail } from "../connections/mail";

const transport = createTransportMail();

export const sendMailDisconnect = async () => {
    try {
        await transport.sendMail({
            from: 'Wpp-Bot Mail <wpp-bot@wpp-bot.com>',
            to: process.env.SMTP_USER,
            subject: "O bot está deconectado",
            text: "Wpp-Bot Descosnectado",
        })
    } catch (error) {
        console.log(error)
    }
}

export const sendMailConnect = async () => {
    try {
        await transport.sendMail({
            from: 'Wpp-Bot Mail <wpp-bot@wpp-bot.com>',
            to: process.env.SMTP_USER,
            subject: "O bot está conectado",
            text: "Wpp-Bot conectado",
        })
    } catch (error) {
        console.log(error)
    }
}