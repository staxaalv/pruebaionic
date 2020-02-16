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
 
  /*private data = [
    {
      category: 'bebida',
      products: [
        { id: 0, name: 'ejemplo1', price: '8' },
        { id: 1, name: 'ejemplo1', price: '5' },
        { id: 2, name: 'ejemplo1', price: '9' },
        { id: 3, name: 'ejemplo1', price: '7' }
      ]
    },
    {
      category: 'computador',
      products: [
        { id: 4, name: 'ejemplo2', price: '8' },
        { id: 5, name: 'ejemplo2', price: '6' }
      ]
    },
    {
      category: 'celular',
      products: [
        { id: 6, name: 'ejemplo3', price: '8' },
        { id: 7, name: 'ejemplo3', price: '5' },
        { id: 8, name: 'ejemplo3', price: '9' }
      ]
    }
  ];*/
 
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
              listaProductos.push( { id: this.idprimary++, name: this.productos[b]["nombre"] , price: this.productos[b]["valor"],imagen: this.productos[b]["imagen"] });
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