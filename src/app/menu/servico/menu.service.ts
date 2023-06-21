import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { DadosFilme, SessaoFilme } from './menu';

@Injectable()
export class MenuService {

    constructor(private http: HttpClient) { }

    getFilmes() {
        return this.http.get<any>('assets/filmes.json')
        .toPromise()
        .then(res => <DadosFilme[]>res.data)
        .then(data => { return data; });
    }

    getSessaoCine1() {
        return this.http.get<any>('assets/sessao.json')
        .toPromise()
        .then(res => <SessaoFilme[]>res.cine1)
        .then(cine1 => { return cine1; });
    }

    getSessaoCine2() {
        return this.http.get<any>('assets/sessao.json')
        .toPromise()
        .then(res => <SessaoFilme[]>res.cine2)
        .then(cine2 => { return cine2; });
    }
}