import connectFirebase from "../connections/firebase";

const db = connectFirebase();

export const saveQrCode = async (imageBuffer : string) => {
    const response = await db.collection('qrCode').doc("sf05Bny9Dx9Hlh8otbo1").set({
        qrCode: imageBuffer,
        updateAt: new Date().toString()
    });
    return response;
}