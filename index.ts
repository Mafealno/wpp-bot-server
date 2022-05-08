import { create } from "@wppconnect-team/wppconnect";
import { sendMailConnect, sendMailDisconnect } from "./src/services/mail";
import { resolveMessage } from "./src/services/message";
import { resolveQrCode } from "./src/services/qrCode";
import { saveSteps } from "./src/services/step";
const stepsJson = require("./passos.json"); 


const start = async () => {
    const client = await create({
        session: 'wpp-bot',
        autoClose: 0,
        disableWelcome: true,
        catchQR: (base64Qr) => resolveQrCode(base64Qr),
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
            args: ['--no-sandbox'],
            userDataDir: './tokens/wpp-bot',
        }
    });
    
    client.onMessage(message => resolveMessage(message, client));
    return client;
}

start().then((data) => {
    setInterval(() => {
        data.startPhoneWatchdog()
        console.log("CONEXÃO VERIFICADA")
    }, 10000)
});
//saveSteps(stepsJson);