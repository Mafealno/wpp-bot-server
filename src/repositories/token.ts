import { SessionToken } from "@wppconnect-team/wppconnect/dist/token-store";
import connectFirebase from "../connections/firebase";
import { Token } from "../types/token";

const db = connectFirebase();

export const getToken = async (sessionName : string) : Promise<Token> => {
    let response : Token = null;
    try {
        const queryRef = await db.collection('tokens')
            .where('sessionName', '==', sessionName)
            .get()

        if (!queryRef.empty) {
            queryRef.forEach((item) => {
                response = {
                    id: item.id,
                    sessionName: sessionName,
                    sessionToken: item.data() as SessionToken,
                };
            });
        }
    } catch (_error) {
        console.log(_error);
    }

    return response;
}

export const saveToken = async (sessionName: string, sessionToken: SessionToken) => {
    let response = await db.collection('tokens').add({ sessionName : sessionName, sessionToken: sessionToken });
    return response;
}

export const updateToken = async (id: string, sessionName: string, sessionToken: SessionToken) => {
    const response = await db.collection('tokens').doc(id).set({ sessionName : sessionName, sessionToken: sessionToken });
    return response;
}

export const getTokens = async () : Promise<Token[]> => {
    let response = await db.collection('tokens').get();
    return response.docs.map(doc => doc.data()) as Token[];
}
