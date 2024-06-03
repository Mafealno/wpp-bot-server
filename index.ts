require('dotenv').config();
import { create, defaultLogger } from "@wppconnect-team/wppconnect";
import { saveSteps } from "./src/repositories/step";
import { sendMailConnect, sendMailDisconnect } from "./src/services/mail";
import { resolveMessage } from "./src/services/message";
import { resolveQrCode } from "./src/services/qrCode";
const stepsJson = require("./passos_pintou_conhecimento.json"); 

const start = async () => {

    defaultLogger.level = process.env.ENVIRONMENT == 'dev' ? 'silly' : 'info';

    const client = await create({
        session: 'wpp-bot',
        autoClose: 0,
        debug: false,
        disableWelcome: true,
        catchQR: (base64Qr) => resolveQrCode(base64Qr),
        useChrome: false,
        logQR: process.env.ENVIRONMENT == 'dev', //faz o qrCode não ser exibido no console,
        folderNameToken: "./tokens/wpp-bot",
        statusFind : async (statusSession, session) => {
            if(process.env.ENVIRONMENT !== 'dev'){
                switch(statusSession){
                    case "isLogged":
                        await sendMailConnect();
                        break;
                    case "notLogged":
                        await sendMailDisconnect();
                        break;
                    }
                }
        },
        puppeteerOptions: {
            ignoreDefaultArgs: false,
            args: ['--no-sandbox'],
            userDataDir: './tokens/wpp-bot',
        }
    });

    client.startPhoneWatchdog(30000);
    client.onMessage(message => resolveMessage(message, client));
    return client;
}
saveSteps(stepsJson);
start();