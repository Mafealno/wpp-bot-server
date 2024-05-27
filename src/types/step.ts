export type Step = {
    id: string,
    tipo: string,
    texto: string,
    proximo_passo: string,
    voltar_anterior?: string,
    voltar_inicial?: string,
    url_imagem?: string,
    titulo?: string,
    url?: string,
    opcoes?: Array<ItemMenu>
    botoes?: Array<ItemBotao>
    proximo_passo_imediato?: boolean,
    texto_erro?: string
};

export type ItemMenu = {
    id: string,
    proximo_passo: string,
    titulo?: string,
    descricao: string,
};

export type ItemBotao = {
    id: string,
    texto: string,
};