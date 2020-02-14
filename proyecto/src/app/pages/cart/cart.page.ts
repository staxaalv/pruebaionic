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
  
  public categorias:Category[];
  public productos:Producto[];

  sliderConfig = {
    slidesPerView: 1.6,
    spaceBetween: 10,
    centeredSlides: true
  };

 
  constructor(
    private router: Router, 
    private cartService: CartService, 
    private prodService:ProductosService, 
    private catService:CategoriaService) { }
 
  ngOnInit() {

    this.items = this.cartService.getProducts();
    this.cart = this.cartService.getCart();
    
  }
 
  addToCart(product) {
    this.cartService.addProduct(product);
  }
 
  openCart() {
    this.router.navigate(['producto']);
  }

  asignarPorductosFiltrados(variable:string){
    this.prodService.filterBy(variable).subscribe(
      res =>{
        this.productos = res;
      });
    return this.productos;
  }
  asinarProductos(){
    this.prodService.getProductos().subscribe(
      res =>{
        this.productos = res;
      });
    return this.productos;
  }

}
