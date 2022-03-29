import connectFirebase from "../connections/firebase";
import LastInteraction from "../types/lastInteraction";

const db = connectFirebase();

export const getLastInteraction = async (phoneNumber : string) : Promise<LastInteraction> => {
    let response : LastInteraction = null;
    try {
        const queryRef = await db.collection('historic')
            .where('user.phoneNumber', '==', phoneNumber)
            .get()

        if (!queryRef.empty) {
            queryRef.forEach((item) => {
                response = item.data() as LastInteraction;
                response.id = item.id;
            });
        }
    } catch (_error) {
        console.log(_error);
    }

    return response;
}

export const saveLastInteraction = async (lastInteraction : LastInteraction) => {
    let response = await db.collection('historic').add(lastInteraction);
    return response;
}

export const updateLastInteractionUser = async (lastInteraction : LastInteraction) => {
    const response = await db.collection('historic').doc(lastInteraction.id).set(lastInteraction);
    return response;
}
