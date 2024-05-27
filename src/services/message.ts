import { Message, Whatsapp } from "@wppconnect-team/wppconnect";
import { Step } from "../types/step";
import { detectYesOrNo } from "./intent";
import * as lasInterationService from "./lasInteration";
import { simpleMessage, listMessage, linkMessage, imageMessage, linkImageMessage } from "./sendMessage";
import { getStep } from "./step";

export const resolveMessage = async (message : Message, client : Whatsapp) => {

    const lastInteraction = await lasInterationService.getLastInteraction(message.from);
    
    let currenStep : Step;
    
    if(message["listResponse"]){
        const selectedOption = message["listResponse"].singleSelectReply.selectedRowId

        switch (selectedOption){
            case "voltar_anterior":
                currenStep = await getStep(await getStep(lastInteraction.currentStep).then(step => step.voltar_anterior));
                break;
            case "voltar_inicial":
                currenStep = await getStep(await getStep(lastInteraction.currentStep).then(step => step.voltar_inicial));
                break;
            default:
                currenStep = await getStep(selectedOption);
                break;
        }
        
        message["listResponse"] = undefined
    }else{
        currenStep = await getStep("inicial", lastInteraction);
    }

    if(message.body.startsWith("!!goto ")){
        currenStep = await getStep(message.body.split(" ")[1]);
        message.body =  "goto"
    }

    if(currenStep == undefined) {
        currenStep = await getStep(lastInteraction.currentStep, null);
        await simpleMessage(client, message.from, currenStep.texto_erro)
    }

    const stepId = await defineAction(currenStep, client, message);

    if(lastInteraction)
        await lasInterationService.updateLastInteractionUser(lastInteraction, message, currenStep.id, stepId || currenStep.proximo_passo || "")
    else
        await lasInterationService.saveLastInteraction(message, currenStep.id, currenStep.proximo_passo)

    if(currenStep.proximo_passo_imediato){
        await resolveMessage(message, client);
    }

}

const defineAction = async (step : Step, client : Whatsapp, message : Message) : Promise<string> => {
    try {
        let response : string;
        switch (step.tipo) {
            case "simples":
                await simpleMessage(client, message.from, step.texto);
                break;
            case "lista":
                await listMessage(client, message.from, step);
                break;
            case "link":
                await linkMessage(client, message.from, step)
                break;
            case "imagem":
                await imageMessage(client, message.from, step)
                break;
            case "link_imagem":
                await linkImageMessage(client, message.from, step)
                break;
            case "valida_sim_ou_nao":
                response = await detectYesOrNo(message, step)
                break;
        }

        return response;
    } catch (error) {
        
    }
}