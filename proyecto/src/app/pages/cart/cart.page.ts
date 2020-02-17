import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from './../../services/cart.service';
import { ProductosService } from "../../services/productos.service";
import { Producto } from "../../shared/product.interface";
import { Category } from "../../shared/category.interface";
import { Observable } from 'rxjs';
import { CategoriaService } from 'src/app/services/categoria.service';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  cart = [];
  items = [];
  /*public categorias: Category[];
  public productos: Producto[];

  public cantCategoria:number;
  public cantProductos:number;
  
  public listaTotal=[];
  */
  sliderConfig = {
    slidesPerView: 1.6,
    spaceBetween: 10,
    centeredSlides: true
  };


  constructor(
    private router: Router,
    private cartService: CartService,
    /*private prodService: ProductosService,
    private catService: CategoriaService*/) { }

  ngOnInit() {
    //this.categorias = this.asinarCategorias();
    this.items = this.cartService.getProducts();
    this.cart = this.cartService.getCart();
    
    //console.log(this.items);
    //console.log(this.listaTotal);
  }

  addToCart(product) {
    this.cartService.addProduct(product);
  }

  openCart() {
    this.router.navigate(['producto']);
  }

  /*asignarPorductosFiltrados(variable: string) {
    this.prodService.filterBy(variable).subscribe(
      res => {
        this.productos = res;
        console.log(this.productos);
        
      });
    return this.productos;
  }
  asinarProductos() {
    this.prodService.getProductos().subscribe(
      res => {
        let inc=0;
        this.productos = res;
        console.log("CANTIDAD DE PRODUCTOS")
        console.log(this.cantProductos=this.productos.length);
      });
      
    return this.productos;
  }

  asinarCategorias() {
    this.catService.getCategorias().subscribe(
      res => {
        let idprimary=0;
        this.categorias = res;
        console.log("CANTIDAD DE CATEGORIAS");
        console.log(this.cantCategoria=this.categorias.length);
        
        for(var a=0;a<this.cantCategoria;a++){
          let listaProductos=[];
          this.prodService.filterBy(this.categorias[a]["nombre"]).subscribe(
            res => {
              this.productos = res;
              
              console.log("CANTIDAD Productos");
              console.log(this.cantProductos=this.productos.length);
              
              for(var b=0;b<this.cantProductos;b++){
                listaProductos.push( { id: idprimary++, name: this.productos[b]["nombre"] , price: this.productos[b]["valor"] });
              }
          });
          this.listaTotal.push({
            category: this.categorias[a]["nombre"],
            products: listaProductos});

          //console.log(this.listaTotal);                   
        }





          //this.lista.push({category: this.categorias[x]["nombre"],});
      });
    return this.categorias;
  }

  /*imprimirItems(){
    for(let elemento of Object.keys(this.categorias)){
      console.log(this.categorias[elemento]);
    }
  }*/



}
