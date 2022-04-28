import { SessionToken } from "@wppconnect-team/wppconnect/dist/token-store";

export type Token = {
    id: string,
    sessionName: string,
    sessionToken: SessionToken
};