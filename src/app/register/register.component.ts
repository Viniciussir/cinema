import { Component, OnInit } from '@angular/core';
import { Operacao } from '../shared/operacao';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  operacao:any = '';

  value5: any;

  constructor() { }

  ngOnInit() {
    this.operacao = Operacao.REGISTER;
  }

  verificaDadosCadastrarCinema(){
    alert('Verificando')
  }

  voltar(){
    this.operacao = Operacao.SIGIN;
  }

}
