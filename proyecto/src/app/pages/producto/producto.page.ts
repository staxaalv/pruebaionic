import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Category } from "../../shared/category.interface"; 
import { CartService } from "../../services/cart.service";
import { ModalController } from '@ionic/angular';
import { CartModalPage } from '../../pages/cart-modal/cart-modal.page';
import { BehaviorSubject } from 'rxjs';
@Component({
  selector: 'app-producto',
  templateUrl: './producto.page.html',
  styleUrls: ['./producto.page.scss'],
})
export class ProductoPage implements OnInit {
  /////
  id:Category;
  sub:any;
  ////
  
  cart = [];
  products = [];
  cartItemCount: BehaviorSubject<number>;
 
  @ViewChild('cart', {static: false, read: ElementRef})fab: ElementRef;
 
  
  
  constructor(private activatedRouted:ActivatedRoute,
    private cartService: CartService, private modalCtrl: ModalController
    ) { }
  
  ngOnInit() {
    ///
    this.sub = this.activatedRouted.params.subscribe(params => {
      this.id = params['id'];});
    console.log("id: "+this.id);

    this.products = this.cartService.getProducts();
    this.cart = this.cartService.getCart();
    this.cartItemCount = this.cartService.getCartItemCount();
  }

  addToCart(product) {
    this.cartService.addProduct(product);
    this.animateCSS('tada');
  }
 
  async openCart() {
    this.animateCSS('bounceOutLeft', true);
 
    let modal = await this.modalCtrl.create({
      component: CartModalPage,
      cssClass: 'cart-modal'
    });
    modal.onWillDismiss().then(() => {
      this.fab.nativeElement.classList.remove('animated', 'bounceOutLeft')
      this.animateCSS('bounceInLeft');
    });
    modal.present();
  }
 
  animateCSS(animationName, keepAnimated = false) {
    const node = this.fab.nativeElement;
    node.classList.add('animated', animationName)
    
    
    function handleAnimationEnd() {
      if (!keepAnimated) {
        node.classList.remove('animated', animationName);
      }
      node.removeEventListener('animationend', handleAnimationEnd)
    }
    node.addEventListener('animationend', handleAnimationEnd)
  }

}
