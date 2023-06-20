import { Component, OnInit } from '@angular/core';
import { DadosFilme } from './servico/menu';
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

    operacao:any = '';

    indPodeHabilitarDialogMenu: boolean = false;

    filmes: DadosFilme[] = [];

    filme: DadosFilme = {}

    filmesSelecionado: DadosFilme[] = [];

    submitted: boolean = false;

    constructor(
      private productService: ProductService, 
      private messageService: MessageService, 
      private confirmationService: ConfirmationService) { }

    ngOnInit() {
        this.operacao = Operacao.MENU;
        this.productService.getProducts().then(data => this.filmes = data);
    }

    openNew() {
        this.filme = {};
        this.submitted = false;
        this.indPodeHabilitarDialogMenu = true;
    }

    deleteSelectedProducts() {
        this.confirmationService.confirm({
            message: 'Tem certeza que deseja excluir os Filmes selecionados?',
            header: 'Confirme',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.filmes = this.filmes.filter(val => !this.filmesSelecionado.includes(val));
                this.messageService.add({severity:'success', summary: 'Sucesso', detail: 'Filme Deletado', life: 3000});
            }
        });
    }

    editProduct(product: DadosFilme) {
        this.filme = {...product};
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
    
    saveProduct() {
        this.submitted = true;

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

}
