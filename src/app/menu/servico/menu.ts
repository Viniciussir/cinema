export interface DadosFilme {
    id?:any;
    tituloFilme?:any;
    sinopseFilme?:any;
    estreiaFilme?:any;
    filmeCartaz?:any;
    duracaoFilme?:any;
    classificacaoFilme?:any;
    generoFilme?:salaSessao;
    sessaoFilme?:any;
    artista?:any;
}

export class salaSessao {
    sala:any;
    idioma:any;
    data:any;
    horario:[] = []
}

