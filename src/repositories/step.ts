import connectFirebase from "../connections/firebase";
import { Step } from "../types/step";

const db = connectFirebase();

export const saveSteps = async (steps : Array<Step>) => {
    let response = db.collection('steps').doc("x7C3O0xZUD980E5Asyjw").set({
        steps: steps
    });
    return response;
}

export const getSteps = async () => {
    let response = await db.collection('steps').get();
    return response.docs.map(doc => doc.data());
}