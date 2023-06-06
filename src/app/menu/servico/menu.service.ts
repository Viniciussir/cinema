import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { DadosFilme } from './menu';

@Injectable()
export class ProductService {

    status: string[] = ['OUTOFSTOCK', 'INSTOCK', 'LOWSTOCK'];

    productNames: string[] = [
        "Bamboo Watch", 
    ];

    constructor(private http: HttpClient) { }

    getProducts() {
        return this.http.get<any>('assets/filmes.json')
        .toPromise()
        .then(res => <DadosFilme[]>res.data)
        .then(data => { return data; });
    }
}