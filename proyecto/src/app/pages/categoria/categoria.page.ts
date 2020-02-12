import { Component, OnInit } from '@angular/core';

import { CategoriaService } from "../../services/categoria.service";
import { Category } from "../../shared/category.interface"; 
//import { EnviarObjetoService } from "../../services/enviar-objeto.service";
import { Router } from '@angular/router';
import { NavController,NavParams} from '@ionic/angular';
import { NavigationExtras } from '@angular/router';
@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.page.html',
  styleUrls: ['./categoria.page.scss'],
})
export class CategoriaPage implements OnInit {
  public categorias:Category[];

  constructor(public categoriaService:CategoriaService,
    /*public enviarObjService:EnviarObjetoService,*/ public router:Router) { }

  ngOnInit() {
    /*this.categoriaService.getallCategories().subscribe(categoria =>
      categoria.map(categoria=>{
        const data:categoria=categoria.payload.doc.data() as categoria;
        this.categorias.push(data);
      }));*/
      this.categoriaService.getCategorias().subscribe(
        res =>{
          this.categorias = res;
        });

  }

  /*public pasarAProductos(x:any){

      console.log(x);
      this.navCtrl.navigateRoot("productos");
  }*/

  /*public goReciver(x:any){
    this.enviarObjService.sendObjectSource(x);
    //this.enviarObjService.sendListSource(this.list);
    this.router.navigate(['/productos']);
  }*/

  goToProductDetails(id:Category) {
    console.log(id)
    this.router.navigate(['/producto', id]);
  }


}
