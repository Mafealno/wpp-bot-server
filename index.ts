require('dotenv').config();
import { create } from "@wppconnect-team/wppconnect";
import { saveSteps } from "./src/repositories/step";
import { sendMailConnect, sendMailDisconnect } from "./src/services/mail";
import { resolveMessage } from "./src/services/message";
import { resolveQrCode } from "./src/services/qrCode";
const stepsJson = require("./passos.json"); 

const start = async () => {
    const client = await create({
        session: 'wpp-bot',
        autoClose: 0,
        disableWelcome: true,
        catchQR: (base64Qr) => resolveQrCode(base64Qr),
        useChrome: false,
        logQR: true, //faz o qrCode não ser exibido no console
        statusFind : async (statusSession, session) => {
            if(!process.env.DEVELOPMENT_ENVIRONMENT){
                switch(statusSession){
                    case "isLogged":
                        await sendMailConnect();
                        console.log(statusSession);
                        break;
                    case "notLogged":
                        await sendMailDisconnect();
                        console.log(statusSession);
                        break;
                    default:
                        console.log(statusSession);
                }
            }
        },
        puppeteerOptions: {
            ignoreDefaultArgs: process.env.DEVELOPMENT_ENVIRONMENT ? true : false,
            args: ['--no-sandbox'],
            userDataDir: './tokens/wpp-bot',
        }
    });
    
    client.onMessage(message => resolveMessage(message, client));
    return client;
}
saveSteps(stepsJson);
start()