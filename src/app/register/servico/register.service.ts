import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Register } from "./register";
import { RegisterDados } from "./registerdados";
import { Observable } from "rxjs";

@Injectable({
    providedIn:'root'
})

export class RegisterService {

    private apiUrl = 'https://servicodados.ibge.gov.br/api/v1/localidades';

    constructor(
        private http: HttpClient
    ) {}

    getCidades(estado: string): Observable<any[]> {
        const url = `${this.apiUrl}/estados/${estado}/municipios`;
        return this.http.get<any[]>(url);
    }

}