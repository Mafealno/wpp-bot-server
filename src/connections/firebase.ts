import firebaseadmin, { ServiceAccount } from "firebase-admin";

let db : firebaseadmin.firestore.Firestore

const connectFirebase = () : firebaseadmin.firestore.Firestore => {
    
    try {
        if(!db){

            process.env.DEVELOPMENT_ENVIRONMENT

            firebaseadmin.initializeApp({ credential: firebaseadmin.credential.cert({
                    api_key : process.env.FIREBASE_API_KEY,
                    type: process.env.TYPE,
                    project_id: process.env.FIREBASE_PROJECT_ID,
                    private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
                    private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
                    client_email: process.env.FIREBASE_CLIENT_EMAIL,
                    client_id: process.env.FIREBASE_CLIENT_ID,
                    auth_uri: process.env.AUTH_URI,
                    token_uri: process.env.TOKEN_URI,
                    auth_provider_x509_cert_url: process.env.AUTH_PROVIDER_X509_CERT_URL,
                    client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL
                } as ServiceAccount)
            });
    
            db = firebaseadmin.firestore();
        }
        return db;
        
    } catch (error) {
        console.log(error)
    }
}

export default connectFirebase