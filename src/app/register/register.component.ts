import { Component, OnInit } from '@angular/core';
import { Operacao } from '../shared/operacao';
import { RegisterService } from '../servico/register.service';
import { Register } from '../servico/register';
import { RegisterDados } from '../servico/registerdados';
import {Message} from 'primeng/api';

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

  constructor(
    private registerService: RegisterService,
    ) {}

  ngOnInit() {
    this.operacao = Operacao.REGISTER;
    this.register = new Register();
    this.registerDados = new RegisterDados();
  }

  cadastrar(){
    if(!this.validarDados()){
      this.msgs2 = [
        {severity:'warn', summary:'Warning', detail:'Verifique os dados informados'},
      ];
      setTimeout(() => {
        this.msgs2 = [];
      }, 1000);
    
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

}
