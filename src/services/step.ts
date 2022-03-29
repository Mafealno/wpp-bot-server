import LastInteraction from "../types/lastInteraction";
import * as stepsRespository from "../repositories/step";
import { Step } from "../types/step";
const stepsSave = require("../../passos.json"); 

export const getStep = async (stepId: string, lastInteraction? : LastInteraction) : Promise<Step> => {
    //saveSteps(stepsSave)
    const steps = await getSteps()
    return steps.find(step => step.id == (lastInteraction ? lastInteraction.nextStep : stepId));
}

const saveSteps = async (steps: Array<Step>) => {
    return await stepsRespository.saveSteps(steps);
}

const getSteps = async () : Promise<Array<Step>> => {
    const response = await stepsRespository.getSteps();
    return response[0]["steps"]
}