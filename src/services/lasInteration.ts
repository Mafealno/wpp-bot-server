import { Message } from "@wppconnect-team/wppconnect";
import * as lastInteractionRepository from "../repositories/lasInteraction";
import LastInteaction from "../types/lastInteraction";
import User from "../types/user";
import { formatPhoneNmuber } from "../utils/text"

export const saveLastInteraction = async (
    message : Message, 
    currentStep : string, 
    nextStep : string) => {

    const lastInteraction : LastInteaction = {
        user : {
            name: message.sender.pushname || "", 
            phoneNumber: formatPhoneNmuber(message.from)
        } as User, 
        currentStep: currentStep,
        nextStep: nextStep,
        messageText : message.body,
        date: new Date()
    }
    return await lastInteractionRepository.saveLastInteraction(lastInteraction);
}
export const getLastInteraction = async (phoneNumber : string) => {
    return await lastInteractionRepository.getLastInteraction(formatPhoneNmuber(phoneNumber));
}
export const updateLastInteractionUser = async (
    LastInteraction : LastInteaction, 
    message : Message, 
    currentStep : string,
    nextStep: string) => {

    const lastInteraction : LastInteaction = {
        id: LastInteraction.id,
        user: LastInteraction.user,
        lastStep: LastInteraction.currentStep, 
        currentStep : currentStep, 
        nextStep: nextStep,
        messageText: message.body,
        date: new Date()
    }

    return await lastInteractionRepository.updateLastInteractionUser(lastInteraction);
}