export const formatText = (text : string) : string => {
    return text.toLowerCase();
}

export const formatPhoneNmuber = (phoneNumber : string) : string => {
    return phoneNumber.replace(/[^\d]+/g, '')
}

export const replaceGreeting = (texto : string) : string  => {
    let response = texto.replace("{{cumprimento}}", () => {
        let h = parseInt(new Date().toLocaleTimeString('pt-BR', {hour: 'numeric', hour12: false}));
        if (h >= 0 && h <= 5) {
            return 'Boa madrugada';
        } else if (h >= 6 && h < 12) {
            return 'Bom dia';
        } else if (h >= 12 && h < 18) {
            return 'Boa tarde';
        } else if (h >= 18 && h <= 23) {
            return 'Boa noite';
        }
    })
    return response;
}
