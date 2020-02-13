import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from './../../services/cart.service';
import { ProductosService } from "../../services/productos.service";
@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  cart = [];
  items = [];
  sliderConfig = {
    slidesPerView: 1.6,
    spaceBetween: 10,
    centeredSlides: true
  };

  categorias=[];
 
  constructor(private router: Router, private cartService: CartService,private productoServices:ProductosService) { }
 
  ngOnInit() {
    this.items = this.cartService.getProducts();
    this.cart = this.cartService.getCart();

    this.productoServices.getProductos().subscribe(
      res =>{
        this.categorias = res;
      });
    
      console.log(this.categorias);
  }
 
  addToCart(product) {
    this.cartService.addProduct(product);
  }
 
  openCart() {
    this.router.navigate(['producto']);
  }

}
