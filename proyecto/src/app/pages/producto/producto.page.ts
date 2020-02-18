import { Component, OnInit } from '@angular/core';
import { CartService } from "../../services/cart.service";
import{ModalMapComponent} from "../../modals/modal-map/modal-map.component"
import {EnviarFacturaService}from "../../services/enviar-factura.service"
import { Historial } from "../../shared/historial.interface";
import { Storage } from '@ionic/storage';
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
  
  cantidad=0;
  
  public lat:number=0;
  public lon:number=0;
  public receivedChildMessage:any;
  public MAPAPIKEY="AIzaSyCvfIdW0WuMF0LP9t36hbJXFk1TrHw9E2g";
  public marker="color:orange%7C"+this.lat+","+this.lon;
  public urlStMap="https://maps.googleapis.com/maps/api/staticmap?center="+this.lat+","+this.lon+"&zoom=15&size=200x200&maptype=roadmap&markers="+this.marker+"&key="+this.MAPAPIKEY;

  public idUser="";
  
  public pedido:Historial={
    clienteid: "",
    descuento:0,
    fecha:new Date(),
    productos:[],
    totalPago:0
  };

  constructor(private cartService: CartService, private envFactServ:EnviarFacturaService,
    private storage:Storage) { 

  }
 
  ngOnInit() {
    this.storage.get('userUid').then(data=> {this.idUser=data});
    let items = this.cartService.getCart();
    let selected = {};
    for (let obj of items) {
      if (selected[obj.id]) {
        selected[obj.id].count++;
      } else {
        selected[obj.id] = {...obj, count: 1};
      }
    }
   
    this.selectedItems = Object.keys(selected).map(key => selected[key]);
    console.log(this.selectedItems);
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
  
  public getMessage(message: any) {
    
    this.receivedChildMessage = message;
    this.lat=this.receivedChildMessage.ubicacion.lat;
    this.lon=this.receivedChildMessage.ubicacion.lng;
    
    this.marker="color:orange%7C"+this.lat+","+this.lon;
    this.urlStMap="https://maps.googleapis.com/maps/api/staticmap?center="+this.lat+","+this.lon+"&zoom=15&size=200x200&maptype=roadmap&markers="+this.marker+"&key="+this.MAPAPIKEY;
    
  }

  public subirPedido(){
    this.pedido.clienteid=this.idUser;
    this.pedido.descuento=this.dscPorcentaje;
    this.pedido.fecha=new Date();
    this.pedido.totalPago=this.total;
    let temp=[];
    for(let item of this.selectedItems ){
      //console.log({idProducto:item.productoId,cantidad:item.count});
      temp.push({idProducto:item.productoId,
                 cantidad:item.count,
                 nombreProducto:item.name
                });
    }
    this.pedido.productos=temp;
    console.log(this.pedido);
    var x=this.envFactServ.guardarPedido(this.pedido);
    if(x){
      console.log("se logro guardar el pedido");
    }
  }

  
  
}
