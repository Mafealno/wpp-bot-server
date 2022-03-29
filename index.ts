import { create } from "@wppconnect-team/wppconnect";
import { resolveMessage } from "./src/services/message";

const start = async () => {
    const client = await create({
        session: 'wpp-bot',
        autoClose: 0,
        puppeteerOptions: { args: ['--no-sandbox'] },
    });

    client.onMessage(message => resolveMessage(message, client));
}

start();