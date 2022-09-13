import { Component, OnInit } from '@angular/core';
import { CarrinhoService } from '../services/carrinho.service';
import { IProdutoCarrinho } from '../produtos';
import { NotificacaoService } from '../services/notificacao.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.css']
})
export class CarrinhoComponent implements OnInit {

  itensCarrinho: IProdutoCarrinho[] = [];
  total: number = 0;

  constructor(
    public carrinhoService: CarrinhoService,
    private notificacaoService: NotificacaoService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.itensCarrinho = this.carrinhoService.obtemCarrinho();
    this.calcularTotal();
  }

  calcularTotal() {
    this.total = this.itensCarrinho.reduce((init, curr) => init + (curr.preco * curr.quantidade), 0);
  }

  removerProdutoCarrinho(idProduto: number) {
    this.itensCarrinho = this.itensCarrinho.filter(i => i.id !== idProduto);
    this.carrinhoService.removerProdutoCarrinho(idProduto);
    this.calcularTotal();
  }

  comprar() {
    this.notificacaoService.notificar('Compra realizada com sucesso');
    this.carrinhoService.limparCarrinho();
    this.router.navigate(['produtos']);
  }
}
