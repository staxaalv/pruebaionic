import { Injectable } from '@angular/core';
import{ProductosService} from "../services/productos.service";
import{Producto} from "../shared/product.interface" 
import { Category } from "../shared/category.interface";
import { CategoriaService } from './categoria.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  
  private data = [
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
  ];
 
  private cart = [];
 
  constructor() { 
      
  }

 
  getProducts() {
    return this.data;
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
}