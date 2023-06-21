import { Component,Input, OnInit } from '@angular/core';
import { DadosFilme, SessaoFilme } from './servico/menu';
import { MenuService } from './servico/menu.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Operacao } from '../shared/operacao';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styles: [`
    :host ::ng-deep .p-dialog .product-image {
        width: 150px;
        margin: 0 auto 2rem auto;
        display: block;
    }
  `],
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

    @Input('nomeCinema') nomeCinema:any;

    operacao:any = '';

    indPodeHabilitarDialogMenu: boolean = false;

    filmes: DadosFilme[] = [];

    filme: DadosFilme = {}

    filmesSelecionado: DadosFilme[] = [];

    submitted: boolean = false;

    listaGeneroFilme:any [] = [];
    valorGeneroFilme:any = '';

    valorClassificacao:any = 0;

    valorSala:any [] = []

    listaSimNao:any [] = [];

    listaHorarios:any [] = [];
    valorHorario:any = '';

    clonedSessaoFilme: { [s: string]: SessaoFilme } = {};

    sessao: SessaoFilme[] = [];
    sessaoFilme: SessaoFilme = {};


    constructor(
      private menuService: MenuService, 
      private messageService: MessageService, 
      private confirmationService: ConfirmationService) { }

    ngOnInit() {
        this.operacao = Operacao.MENU;
        this.menuService.getFilmes().then(data => this.filmes = data);

        this.listaGeneroFilme = [
            { "code": "Ação", "name": "Ação" },
            { "code": "Comédia", "name": "Comédia" },
            { "code": "Drama", "name": "Drama" },
            { "code": "Terror", "name": "Terror" },
            { "code": "Romance", "name": "Romance" },
            { "code": "Aventura", "name": "Aventura" },
            { "code": "Ficção Científica", "name": "Ficção Científica" },
            { "code": "Suspense", "name": "Suspense" },
            { "code": "Fantasia", "name": "Fantasia" },
            { "code": "Animação", "name": "Animação" },
        ];

        this.listaSimNao = [
            { "value": "Sim", "label": "Sim" },
            { "value": "Não", "label": "Não" },
        ];

        this.listaHorarios = [
            { "code": "01:00", "name": "01:00" },
            { "code": "01:30", "name": "01:30" },
            { "code": "02:00", "name": "02:00" },
            { "code": "02:30", "name": "02:30" },
            { "code": "03:00", "name": "03:00" },
            { "code": "03:30", "name": "03:30" },
            { "code": "04:00", "name": "04:00" },
            { "code": "04:30", "name": "04:30" },
            { "code": "05:00", "name": "05:00" },
            { "code": "05:30", "name": "05:30" },
            { "code": "06:00", "name": "06:00" },
            { "code": "06:30", "name": "06:30" },
            { "code": "07:00", "name": "07:00" },
            { "code": "07:30", "name": "07:30" },
            { "code": "08:00", "name": "08:00" },
            { "code": "08:30", "name": "08:30" },
            { "code": "09:00", "name": "09:00" },
            { "code": "09:30", "name": "09:30" },
            { "code": "10:00", "name": "10:00" },
            { "code": "10:30", "name": "10:30" },
            { "code": "11:00", "name": "11:00" },
            { "code": "11:30", "name": "11:30" },
            { "code": "12:00", "name": "12:00" },
            { "code": "12:30", "name": "12:30" },
            { "code": "13:00", "name": "13:00" },
            { "code": "13:30", "name": "13:30" },
            { "code": "14:00", "name": "14:00" },
            { "code": "14:30", "name": "14:30" },
            { "code": "15:00", "name": "15:00" },
            { "code": "15:30", "name": "15:30" },
            { "code": "16:00", "name": "16:00" },
            { "code": "16:30", "name": "16:30" },
            { "code": "17:00", "name": "17:00" },
            { "code": "17:30", "name": "17:30" },
            { "code": "18:00", "name": "18:00" },
            { "code": "18:30", "name": "18:30" },
            { "code": "19:00", "name": "19:00" },
            { "code": "19:30", "name": "19:30" },
            { "code": "20:00", "name": "20:00" },
            { "code": "20:30", "name": "20:30" },
            { "code": "21:00", "name": "21:00" },
            { "code": "21:30", "name": "21:30" },
            { "code": "22:00", "name": "22:00" },
            { "code": "22:30", "name": "22:30" },
            { "code": "23:00", "name": "23:00" },
            { "code": "23:30", "name": "23:30" },
            { "code": "00:00", "name": "00:00" },
            { "code": "00:30", "name": "00:30" },
        ];
    }

   

    abrirNovo() {
        this.filme = {};
        this.sessaoFilme = {};
        this.submitted = false;
        this.indPodeHabilitarDialogMenu = true;
    }

    deletarTodosFilmes() {
        this.confirmationService.confirm({
            message: 'Tem certeza que deseja excluir os Filmes selecionados?',
            header: 'Confirmar',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.filmes = this.filmes.filter(val => !this.filmesSelecionado.includes(val));
                this.filmesSelecionado = [];
                this.messageService.add({severity:'success', summary: 'Sucesso', detail: 'Filme Deletado', life: 3000});
            }
        });
    }

    editProduct(filme: DadosFilme) {
        this.filme = {...filme};
        if(filme.tituloFilme){
            if(filme.tituloFilme == "O Mistério da Mansão"){
                this.menuService.getSessaoCine1().then(cine1 => this.sessao = cine1);
            }
        }
        this.preencherValoresEditarFilmes();
        this.indPodeHabilitarDialogMenu = true;
    }

    deleteProduct(product: DadosFilme) {
        this.confirmationService.confirm({
            message: 'Tem certeza de que deseja excluir ' + product.tituloFilme + '?',
            header: 'Confirme',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.filmes = this.filmes.filter(val => val.id !== product.id);
                this.filme = {};
                this.messageService.add({severity:'success', summary: 'Sucesso', detail: 'Filme Deletado', life: 3000});
            }
        });
    }

    hideDialog() {
        this.indPodeHabilitarDialogMenu = false;
        this.submitted = false;
    }

    formatarData(data:any) {
        const dia = data.getDate().toString().padStart(2, '0');
        const mes = (data.getMonth() + 1).toString().padStart(2, '0');
        const ano = data.getFullYear().toString();
      
        return `${dia}.${mes}.${ano}`;
      }
    
    saveProduct() {
        this.submitted = true;

        let dataFormatada = this.formatarData(this.filme.estreiaFilme);

        this.filme.estreiaFilme = dataFormatada;

        if (this.filme.tituloFilme.trim()) {
            if (this.filme.id) {
                this.filmes[this.findIndexById(this.filme.id)] = this.filme;                
                this.messageService.add({severity:'success', summary: 'Sucesso', detail: 'Filme atualizado', life: 3000});
            }
            else {
                this.filme.id = this.createId();
                this.filmes.push(this.filme);
                this.messageService.add({severity:'success', summary: 'Sucesso', detail: 'Filme adicionado', life: 3000});
            }

            this.filmes = [...this.filmes];
            this.indPodeHabilitarDialogMenu = false;
            this.filme = {};
        }
    }

    findIndexById(id: string): number {
        let index = -1;
        for (let i = 0; i < this.filmes.length; i++) {
            if (this.filmes[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    createId(): string {
        let id = '';
        var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for ( var i = 0; i < 5; i++ ) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }

    voltar(){
        this.operacao = Operacao.SIGIN;
    }

    limparMensagem(){
        this.messageService.clear();
    }

    selecionarFilme(){
        if(this.valorGeneroFilme){
            this.filme.generoFilme = this.valorGeneroFilme.name;
        } else {
            this.filme.generoFilme = '';
        } 
    }

    selecionarClassificacao(){
        if(this.valorClassificacao || this.valorClassificacao === 0){
          this.filme.classificacaoFilme = this.valorClassificacao;
        }else {
          this.filme.classificacaoFilme = '';
        }    
    }

    onRowEditInit(sessaoFilme: SessaoFilme) {
        this.clonedSessaoFilme[sessaoFilme.id] = { ...sessaoFilme };
    }

    onRowEditSave(sessaoFilme: SessaoFilme) {
        if (sessaoFilme.nome > 0) {
            delete this.clonedSessaoFilme[sessaoFilme.id];
            this.messageService.add({
              severity: 'success',
              summary: 'Sucesso',
              detail: 'Sessão Atualizada',
            });
        } else {
            this.messageService.add({
              severity: 'error',
              summary: 'Erro',
              detail: 'Informe o Nome da Sessão',
            });
        }
    } 

    onRowEditCancel(sessaoFilme: SessaoFilme, index: number) {
        this.sessao[index] = this.clonedSessaoFilme[sessaoFilme.id];
        delete this.sessao[sessaoFilme.id];
    }

    preencherValoresEditarFilmes(){
        if(this.filme.classificacaoFilme){
            this.valorClassificacao = this.filme.classificacaoFilme;
        }
        if(this.filme.generoFilme){
            this.valorGeneroFilme = {
                'code': this.filme.generoFilme,
                'name': this.filme.generoFilme,
            }
        }
        if(this.sessaoFilme.horario){
            let listaHorario = this.sessaoFilme.horario.split(",")
            let valor:any [] = [];
            for (let i = 0; i < listaHorario.length; i++) {
                valor.push({
                    'code': listaHorario[i],
                    'name': listaHorario[i]
                });
            }
            this.valorHorario = valor;
        }
    }

    selecionarHorario(){
        if(this.valorHorario){
            let valor:any [] = [];
            for (let i = 0; i < this.valorHorario.length; i++) {
                valor.push(this.valorHorario[i].name);
            }
            this.sessaoFilme.horario = valor;
        } else {
            this.sessaoFilme.horario = '';
        } 
    }

}
