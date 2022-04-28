import { create } from "@wppconnect-team/wppconnect";
import { sendMailConnect, sendMailDisconnect } from "./src/services/mail";
import { resolveMessage } from "./src/services/message";
import { saveSteps } from "./src/services/step";
const stepsJson = require("./passos.json"); 


const start = async () => {
    const client = await create({
        session: 'wpp-bot',
        autoClose: 0,
        disableWelcome: true,
        statusFind : async (statusSession, session) => {
            switch(statusSession){
                case "isLogged":
                    await sendMailConnect();
                    break;
                case "notLogged":
                    await sendMailDisconnect();
                    break;
                default:
                    console.log(statusSession);
            }
        },
        puppeteerOptions: { 
            userDataDir: './tokens/wpp-bot',
        }
    });
    
    client.onMessage(message => resolveMessage(message, client));
    
    client.startPhoneWatchdog();
}

start();
//saveSteps(stepsJson);