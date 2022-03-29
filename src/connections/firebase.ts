import firebaseadmin from "firebase-admin";
const firebaseJson = require("../../config/firebase.json");  

let db : firebaseadmin.firestore.Firestore

const connectFirebase = () : firebaseadmin.firestore.Firestore => {
    
    if(!db){
        firebaseadmin.initializeApp({
            credential: firebaseadmin.credential.cert(firebaseJson)
        });

        db = firebaseadmin.firestore();
    }
    return db;
}

export default connectFirebase