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
}