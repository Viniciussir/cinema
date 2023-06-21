export interface DadosFilme {
    id?:any;
    tituloFilme?:any;
    sinopseFilme?:any;
    estreiaFilme?:any;
    duracaoFilme?:any;
    classificacaoFilme?:any;
    generoFilme?:any;
    sessaoFilme?:sessaoFilme;
}

export class sessaoFilme {
    sala:any = ''
    idioma:any = ''
    data:any = ''
    horario:[] = [];
}

