import { Component,Input, OnInit } from '@angular/core';
import { DadosFilme, sessaoFilme } from './servico/menu';
import { ProductService } from './servico/menu.service';
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


    constructor(
      private productService: ProductService, 
      private messageService: MessageService, 
      private confirmationService: ConfirmationService) { }

    ngOnInit() {
        this.operacao = Operacao.MENU;
        this.productService.getProducts().then(data => this.filmes = data);

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
    }

    abrirNovo() {
        this.filme = {};
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

    editProduct(product: DadosFilme) {
        this.filme = {...product};
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
        const dia = data.getDate().toString().padStart(2, '0'); // Obtém o dia e adiciona um zero à esquerda, se necessário
        const mes = (data.getMonth() + 1).toString().padStart(2, '0'); // Obtém o mês (0-11) e adiciona um zero à esquerda, se necessário
        const ano = data.getFullYear().toString(); // Obtém o ano com 4 dígitos
      
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

    onRowEditInit(linha:any) {
        console.log(linha)
    }

    onRowEditSave(linha:any) {
        console.log(linha)
    }

    onRowEditCancel(linha: any) {
        console.log(linha)
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

    }

}
