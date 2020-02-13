import { Component, OnInit } from '@angular/core';
import { CartService } from "../../services/cart.service";
@Component({
  selector: 'app-productos',
  templateUrl: './producto.page.html',
  styleUrls: ['./producto.page.scss'],
})
export class ProductoPage implements OnInit {
  selectedItems = [];
 public dscPorcentaje=0;
  total = 0;
 
  constructor(private cartService: CartService) { }
 
  ngOnInit() {
    let items = this.cartService.getCart();
    let selected = {};
    for (let obj of items) {
      if (selected[obj.id]) {
        selected[obj.id].count++;
      } else {
        selected[obj.id] = {...obj, count: 1};
      }
    }
    this.selectedItems = Object.keys(selected).map(key => selected[key])
    this.total = this.selectedItems.reduce((a, b) => a + (b.count * b.price), 0);
    this.dscPorcentaje=this.randomInt(0,30);
  }

  randomInt(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
 }
 
}
