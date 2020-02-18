import { Injectable } from '@angular/core';
import{ProductosService} from "../services/productos.service";
import{Producto} from "../shared/product.interface" 
import { Category } from "../shared/category.interface";
import { CategoriaService } from './categoria.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  
  public categorias: Category[];
  public productos: Producto[];

  public cantCategoria:number;
  public cantProductos:number;
  
  public listaTotal=[];

  public idprimary=0;
  
  private cart = [];
 
  constructor(private prodService: ProductosService,
    private catService: CategoriaService) {
  }

 
  getProducts() {
    //return this.data;
    this.categorias=this.asinarCategorias();
    return this.listaTotal;
  }

  getCart() {
    return this.cart;
  }
 
  addProduct(product) {
    this.cart.push(product);
  }
  deleteProduct(prodId){
    console.log("ID DE PRODUCTO= "+prodId+"  cartlength="+this.cart.length);
    console.log(this.cart);
    let x=0;
    for( x=0;x<this.cart.length;x++){
      if (this.cart[x].id==prodId){
        this.cart.splice(x,1);
        x=-1;
        console.log("cart size= "+this.cart.length+"posicion x"+x);
      }
    }
    console.log(this.cart);
  }
/*
   organizar(){
    for(let cat of this.categorias){
      let extraProducto=[];
      for(let prod of this.productos){
        
        if(cat.nombre==prod.nombreCat){
          extraProducto.push({ id:prod.id , name: prod.nombre, price: prod.preciounit });
        }
      }
      this.extraData.push({
      category: cat.nombre,
      products: extraProducto
      });
    }
    return this.extraData;
  }
*/

asinarCategorias() {
  this.catService.getCategorias().subscribe(
    res => {
      
      this.categorias = res;
      this.cantCategoria=this.categorias.length;
      
      for(var a=0;a<this.cantCategoria;a++){
        let listaProductos=[];
        this.prodService.filterBy(this.categorias[a]["nombre"]).subscribe(
          res => {
            this.productos = res;
            
            
            this.cantProductos=this.productos.length;
            
            for(var b=0;b<this.cantProductos;b++){
              listaProductos.push( { id: this.idprimary++, name: this.productos[b]["nombre"] , price: this.productos[b]["valor"],imagen: this.productos[b]["imagen"], productoId:this.productos[b]["id"] });
            }
        });
        //console.log(listaProductos);
        this.listaTotal.push({
          category: this.categorias[a]["nombre"],
          products: listaProductos});

        //console.log(this.listaTotal);                   
      }
        //this.lista.push({category: this.categorias[x]["nombre"],});
    });
  return this.categorias;
}




}