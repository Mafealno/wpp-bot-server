import { Whatsapp } from "@wppconnect-team/wppconnect";
import { Step } from "../types/step";
import { mountBackOptions } from "../utils/component";
import { replaceGreeting } from "../utils/text";

export const simpleMessage = async (client: Whatsapp, to : string, texto: string) => {
    try {
        await client.sendText(to, replaceGreeting(texto));
    } catch (error) {
        console.log(error)
    }
}

export const linkMessage = async (client: Whatsapp, to : string, step: Step) => {
    try {
        await client.sendLinkPreview(
            to,
            step.url,
            replaceGreeting(step.texto)
        );
    } catch (error) {
        console.log(error)
    }
}

export const linkImageMessage = async (client: Whatsapp, to : string, step: Step) => {
    try {
        await client.sendMessageWithThumb(
            step.url_imagem,
            step.url,
            replaceGreeting(step.titulo), 
            replaceGreeting(step.texto), 
            to);
    } catch (error) {
        console.log(error)
    }
}

export const imageMessage = async (client: Whatsapp, to : string, step: Step) => {
    try {
        const response = await client.sendImage(
            to,
            step.url_imagem,
        );
        return response;
    } catch (error) {
        console.log(error)
    }

}

export const listMessage = async (client: Whatsapp, to : string, step : Step) => {
    try {
        let sessoes = [];
        if(step.opcoes){
            sessoes.push({
                   title: "Opções",
                   rows: step.opcoes.map(opcao => {
                       return {
                           rowId: opcao.proximo_passo,
                           title: opcao.titulo,
                           description: opcao.descricao
                       }
                   })
               })
        }
        
        let opcoesVoltar = mountBackOptions(step);

        if(opcoesVoltar){
            sessoes.push(opcoesVoltar);
        }

        await client.sendListMessage(to, {
            buttonText: "Escolher",
            description: replaceGreeting(step.texto),
            sections: sessoes
        });
    } catch (error) {
        console.log(error)
    }
}