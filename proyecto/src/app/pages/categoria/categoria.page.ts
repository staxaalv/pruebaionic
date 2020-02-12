import { Component, OnInit } from '@angular/core';

import { CategoriaService } from "../../services/categoria.service";
import { Category } from "../../shared/category.interface"; 
//import { EnviarObjetoService } from "../../services/enviar-objeto.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.page.html',
  styleUrls: ['./categoria.page.scss'],
})
export class CategoriaPage implements OnInit {
  public categorias:Category[];

  constructor(private categoriaService:CategoriaService,private router:Router,/* private enviarObjService:EnviarObjetoService*/) { }

  ngOnInit() {
    this.categoriaService.getCategorias().subscribe(
      res =>{
        this.categorias = res;
      });
  }

  /*public goReciver(x:any){
    this.enviarObjService.sendObjectSource(x);
    //this.enviarObjService.sendListSource(this.list);
    this.router.navigate(['/productos']);
  }*/

}
