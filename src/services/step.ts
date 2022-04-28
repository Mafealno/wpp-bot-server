import LastInteraction from "../types/lastInteraction";
import * as stepsRespository from "../repositories/step";
import { Step } from "../types/step"; 

export const getStep = async (stepId: string, lastInteraction? : LastInteraction) : Promise<Step> => {
    const steps = await getSteps()
    return steps.find(step => step.id == (lastInteraction ? lastInteraction.nextStep : stepId));
}

export const saveSteps = async (steps: Array<Step>) => {
    return await stepsRespository.saveSteps(steps);
}

const getSteps = async () : Promise<Array<Step>> => {
    const response = await stepsRespository.getSteps();
    return response[0]["steps"]
}