import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Register } from "./register";
import { RegisterDados } from "./registerdados";

@Injectable({
    providedIn:'root'
})

export class RegisterService {

    constructor(
        private http: HttpClient
    ) {}

    gravarDadosCadastro(registerDados:RegisterDados) {
        return this.http.post("https://api.github.com/repos/OWNER/REPO", 
        {'oFiltro': JSON.stringify(registerDados)})
    }

}