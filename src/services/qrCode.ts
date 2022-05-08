import { saveQrCode } from "../repositories/qrCode";

export const resolveQrCode = (base64Qr : string) => {
    var matches = base64Qr.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
      response = {} as any;

    response.type = matches[1];
    response.data = Buffer.from(matches[2], 'base64');

    const imageBuffer = JSON.stringify(response);

    saveQrCode(base64Qr);
  }