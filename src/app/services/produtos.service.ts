import { Injectable } from '@angular/core';
import { IProduto, produtos } from 'src/app/produtos';

@Injectable({
  providedIn: 'root'
})
export class ProdutosService {

  produtos: IProduto[] = produtos;

  constructor() { }

  getAll(){
    return this.produtos;
  }
  getOne(idProduto: number){
    return this.produtos.find(p => p.id == idProduto);
  }
}
