import * as wppconnect from "@wppconnect-team/wppconnect";
import { getToken, getTokens, saveToken, updateToken } from "../repositories/token";

export const tokenStore: wppconnect.tokenStore.TokenStore = {
    getToken: async (sessionName: string) => {
        const response = await getToken(sessionName);
        return response?.sessionToken;
    },
    setToken: async (sessionName: string, tokenData: wppconnect.tokenStore.SessionToken) => {
        try {
            let response = await getToken(sessionName);
            if(response?.id){
                updateToken(response.id, sessionName, tokenData);
            }else{
                await saveToken(sessionName, tokenData);
            }
            return true;
        } catch (error) {
            return false;
        }
    },
    removeToken: (sessionName: string) => true,
      
    listTokens: async () => {
        const response = await getTokens();
        return response.map(item => item.sessionName);
    }
  };