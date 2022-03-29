import { Step } from "../types/step";

export const mountBackOptions = (step : Step) => {
    let entrou = false;
    let opcoes = [];
    if(step.voltar_anterior){
        entrou = true;
        opcoes.push({
            rowId: "voltar_anterior",
            title: "Anterior",
            description: "Voltar ao menu anterior"
        });;
    }
    if(step.voltar_inicial){
        entrou = true;
        opcoes.push({
            rowId: "voltar_inicial",
            title: "Menu inicial",
            description: "Voltar ao menu inicial"
        })
    }

    if(entrou){
        return {
            title: "Voltar",
            rows: opcoes
        }
    }else{
        return undefined;
    }
}