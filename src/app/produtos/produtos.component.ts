import { Component, OnInit } from '@angular/core';
import { IProduto, produtos } from '../produtos';
import { ProdutosService } from '../services/produtos.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css']
})
export class ProdutosComponent implements OnInit {

  produtos: IProduto[] | undefined;

  constructor(
    private produtosService: ProdutosService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const produtos = this.produtosService.getAll();
    this.route.queryParamMap.subscribe(p => {
      const descricao = p.get('descricao')?.toLocaleLowerCase();

      if(descricao){
        this.produtos = produtos.filter(p => p.descricao.toLocaleLowerCase().includes(descricao));
        return;
      }
      this.produtos = produtos;
    });
  }

}
