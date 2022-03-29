import User from "./user"

type LastInteraction = {
    id?: string
    user: User
    currentStep: string
    lastStep?: string,
    nextStep: string,
    date: Date
    messageText: string
}

export default LastInteraction