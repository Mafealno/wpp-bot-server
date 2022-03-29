import dialogflow from "@google-cloud/dialogflow";
import { google } from "@google-cloud/dialogflow/build/protos/protos";
import { v4 } from "uuid";
const dialogFlowJson = require("../../config/dialogflow.json") 

export const detectIntent = async (term : string) : Promise<google.cloud.dialogflow.v2.IQueryResult> => {
    try {
        const sessionsClient = new dialogflow.SessionsClient({ credentials: dialogFlowJson });
        
        const sessionPath = sessionsClient.projectAgentSessionPath(
            dialogFlowJson["project_id"],
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