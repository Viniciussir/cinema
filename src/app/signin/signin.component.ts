import { Operacao } from './../shared/operacao';
import { Component, OnInit } from '@angular/core';
import { Signin } from './servico/signin';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  signin:Signin = new Signin();

  operacao:any = '';

  constructor(
    private messageService: MessageService, 
  ) {}

  ngOnInit() {
    this.messageService.clear();
    this.operacao = Operacao.SIGIN;
  }

  inscreva() {
    this.operacao = Operacao.REGISTER;
  }

  verificaCamposLogin(){
    this.messageService.clear();
    if(this.signin.user){
      if(this.signin.password){
       this.validarlogin();
      } else {
        this.messageService.add({severity:'warn', summary: 'Atenção', detail: 'Senha invalida.', life: 3000});
      }
    } else {
      this.messageService.add({severity:'warn', summary: 'Atenção', detail: 'Usuário invalido.', life: 3000});
    }
  }

  validarlogin(){
    if(this.signin.user == 'CineRoxy' && this.signin.password == '123456'){
      this.operacao = Operacao.MENU;
    } else if(this.signin.user == 'CineMark' && this.signin.password == '123456'){
      this.operacao = Operacao.MENU;
    } else if(this.signin.user == 'CineFlix' && this.signin.password == '123456'){
      this.operacao = Operacao.MENU;
    } else {
      this.messageService.add({severity:'error', summary: 'Erro', detail: 'Verifique os dados informados.', life: 3000});
    }
  }

  limparMensagem(){
    this.messageService.clear();
  }

}
