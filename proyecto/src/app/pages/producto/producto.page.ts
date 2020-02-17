import { Component, OnInit } from '@angular/core';
import { CartService } from "../../services/cart.service";
import { listChanges } from 'angularfire2/database';
@Component({
  selector: 'app-productos',
  templateUrl: './producto.page.html',
  styleUrls: ['./producto.page.scss'],
})
export class ProductoPage implements OnInit {
  selectedItems = [];
 public dscPorcentaje=0;
  total = 0;
  iva =0;
  subtotal=0;
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

    this.subtotal = this.selectedItems.reduce((a, b) => a + (b.count * b.price), 0);
    this.iva=this.subtotal*12/100;
    this.dscPorcentaje=(this.randomInt(0,30))*this.subtotal/100;
    this.total=this.subtotal+this.iva-this.dscPorcentaje;
  }

  randomInt(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
 }

 borrarSelectedItems(item){
    console.log(this.selectedItems);
    for(var x=0;x<this.selectedItems.length;x++){
      console.log("imprimeindo");
      console.log(this.selectedItems[x]);;
      if(this.selectedItems[x].id==item.id){
        this.selectedItems.splice(x,1);
        break;
      }
    }
    this.subtotal=this.calcularSubtotal();
    this.iva=this.calcularIVA();
    this.dscPorcentaje=this.calcularDescuento();
    this.total=this.calcularTotal();
    this.cartService.deleteProduct(item.id)
    
 }

 calcularIVA(){
  return this.subtotal*12/100;
  }

  calcularSubtotal(){
   return this.selectedItems.reduce((a, b) => a + (b.count * b.price), 0);
  }
  calcularDescuento(){
    return (this.randomInt(0,30))*this.subtotal/100;
  }
  calcularTotal(){
    return this.subtotal+this.iva-this.dscPorcentaje;
  }
 
}
