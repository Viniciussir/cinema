import { Operacao } from './../shared/operacao';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  operacao:any = '';
  usuario:any;
  senha:any;

  constructor() { }

  ngOnInit() {
    this.operacao = Operacao.SIGIN;
  }

  inscreva() {
    this.operacao = Operacao.REGISTER;
  }

  validarLogin(){
  this.operacao = Operacao.MENU;
  }


}
