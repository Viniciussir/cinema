import { Component, OnInit } from '@angular/core';
import { Operacao } from '../shared/operacao';
import {Message, MessageService} from 'primeng/api';
import { Register } from './servico/register';
import { RegisterDados } from './servico/registerdados';
import { RegisterService } from './servico/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  register:Register = new Register();
  registerDados:RegisterDados = new RegisterDados();

  operacao:any = '';

  msgs2: Message[] = []

  listaCidade:any [] = [];

  listaRegiao:any [] = [];

  constructor(
    private registerService: RegisterService,
    private messageService: MessageService, 
    ) {}

  ngOnInit() {
    this.operacao = Operacao.REGISTER;
    this.register = new Register();
    this.registerDados = new RegisterDados();
    this.obterCidades();

    this.listaRegiao= [
      {"code": 1,"name": "Região Metropolitana de São Paulo"},
      {"code": 2,"name": "Região Metropolitana de Campinas"},
      {"code": 3,"name": "Região Metropolitana de Ribeirão Preto"},
      {"code": 4,"name": "Região Metropolitana de São José do Rio Preto"}, 
      {"code": 5,"name": "Região Metropolitana de Sorocaba"}, 
      {"code": 6,"name": "Região Metropolitana de Baixada Santista"}, 
      {"code": 7,"name": "Região Metropolitana de Vale do Paraíba e Litoral Norte"}, 
      {"code": 8,"name": "Região Metropolitana de Araçatuba"}, 
      {"code": 9,"name": "Região Metropolitana de Araraquara"}, 
      {"code": 10, "name": "Região Metropolitana de Assis"}, 
      {"code": 11,"name": "Região Metropolitana de Bauru"}, 
      {"code": 12,"name": "Região Metropolitana de Marília"}, 
      {"code": 13,"name": "Região Metropolitana de Prescodeente Prudente"}, 
      {"code": 14,"name": "Região Metropolitana de Registro"}, 
      {"code": 15,"name": "Região Metropolitana de São José dos Campos"}, 
      {"code": 16,"name": "Região Metropolitana de Piracicaba"}, 
      {"code": 17,"name": "Região Metropolitana de Franca"}, 
      {"code": 18,"name": "Região Metropolitana de Itapetininga"},
      {"code": 19,"name": "Região Metropolitana de Itapeva"}
    ]

  }

  cadastrar(){
    if(!this.validarDados()){
      this.messageService.add({severity:'error', summary: 'Erro', detail: 'Verifique os dados informados.', life: 3000});
      return false
    }
    this.gravarDados(this.register);
    return true
  }

  validarDados(){
    if(!this.register.nome || !this.register.nomeFantasia || !this.register.cnpj || !this.register.logradouro  || 
      !this.register.numero || !this.register.bairro || !this.register.complemento || !this.register.cidade || 
      !this.register.uf || !this.register.cep || !this.register.usuario || !this.register.senha){
      return false
    }
    return true;
  }

  gravarDados(register:Register){

    this.registerDados.nome = register.nome;
    this.registerDados.nomeFantasia = register.nomeFantasia;
    this.registerDados.cnpj = register.cnpj;
    this.registerDados.endereco.push({
      'logradouro': register.logradouro,
      'numero': register.numero,
      'bairro': register.bairro,
      'complemento': register.complemento,
      'cidade': register.logradouro,
      'uf': register.uf,
      'cep': register.cep,
    })
      this.registerService.gravarDadosCadastro(this.registerDados).subscribe(data => {
      console.log(data);
    })
  }

  voltar(){
    this.operacao = Operacao.SIGIN;
  }

  limparMensagem(){
    this.messageService.clear();
  }

  adicionarValorUf(cidade:any){
    if(cidade){
      this.register.uf = 'SP';
    } else {
      this.register.uf = '';
    }
  }

  obterCidades() {
    this.registerService.getCidades('SP').subscribe(cidades => {
      let lista:any [] = []
      for (let i = 0; i < cidades.length; i++) {
        lista.push({
          'code':cidades[i].id,
          'name':cidades[i].nome,
        })
      }
        this.listaCidade = lista;
      },
      error => {
        console.error(error);
      }
    );
  }

}
