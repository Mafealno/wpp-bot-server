import { SessionsClient } from "@google-cloud/dialogflow";
import { google } from "@google-cloud/dialogflow/build/protos/protos";
import { v4 } from "uuid";

export const detectIntent = async (term : string) : Promise<google.cloud.dialogflow.v2.IQueryResult> => {
    try {
        const sessionsClient = new SessionsClient({
          credentials: {
            type: process.env.TYPE,
            project_id: process.env.DIALOGFLOW_PROJECT_ID,
            private_key_id: process.env.DIALOGFLOW_PRIVATE_KEY_ID,
            private_key: process.env.DIALOGFLOW_PRIVATE_KEY.replace(/\\n/g, '\n'),
            client_email: process.env.DIALOGFLOW_CLIENT_EMAIL,
            client_id: process.env.DIALOGFLOW_CLIENT_ID,
            auth_uri: process.env.AUTH_URI,
            token_uri: process.env.TOKEN_URI,
            auth_provider_x509_cert_url: process.env.AUTH_PROVIDER_X509_CERT_URL,
            client_x509_cert_url: process.env.DIALOGFLOW_CLIENT_X509_CERT_URL
          } as unknown
        });
        
        const sessionPath = sessionsClient.projectAgentSessionPath(
            process.env.DIALOGFLOW_PROJECT_ID,
            v4()
          );

        const request = {
            session: sessionPath,
            queryInput: {
              text: {
                text: term,
                languageCode: 'pt-BR',
              },
            },
          };

        const responses = await sessionsClient.detectIntent(request)
        return responses[0].queryResult;

    } catch (error) {
        console.log(error)
    }
}