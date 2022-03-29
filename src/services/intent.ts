import { Message } from "@wppconnect-team/wppconnect";
import * as intentRepository from "../connections/dialogflow";
import { Step } from "../types/step";
import { getStep } from "./step";

export const detectYesOrNo = async (message : Message, step: Step) : Promise<string> => {
    
    const response = await intentRepository.detectIntent(message.body);

    switch(response.intent.name.split("/")[4]){
        case "4e479f18-8974-4c90-854f-175fb33e6214":
            return step.opcoes.find(opcao => opcao.id == "sim").proximo_passo;
        case "22ab886f-5b17-49d1-b58d-c117d43116e2":
            return step.opcoes.find(opcao => opcao.id == "nao").proximo_passo;
        default:
            return step.opcoes.find(opcao => opcao.id == "nao_entendimento").proximo_passo;
    }
}

// export const detectName = async (message : Message) : Promise<string> => {
//     const response = await intentRepository.detectIntent(message.body);

//     if(response.intent.defaultResponsePlatforms[0].toString() == "true"){
//         return true;
//     }else if(response.intent.defaultResponsePlatforms[0].toString() == "false"){
//         return false
//     }else{
//         return response.intent.defaultResponsePlatforms[0].toString()
//     }
// }