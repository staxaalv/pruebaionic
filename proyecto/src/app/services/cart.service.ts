import { Injectable } from '@angular/core';
 
@Injectable({
  providedIn: 'root'
})
export class CartService {
 
  private data = [
    {
      category: 'Pizza',
      products: [
        { id: 0, name: 'ejemplo1', price: '8' },
        { id: 1, name: 'ejemplo1', price: '5' },
        { id: 2, name: 'ejemplo1', price: '9' },
        { id: 3, name: 'ejemplo1', price: '7' }
      ]
    },
    {
      category: 'Pasta',
      products: [
        { id: 4, name: 'ejemplo2', price: '8' },
        { id: 5, name: 'ejemplo2', price: '6' }
      ]
    },
    {
      category: 'Salad',
      products: [
        { id: 6, name: 'ejemplo3', price: '8' },
        { id: 7, name: 'ejemplo3', price: '5' },
        { id: 8, name: 'ejemplo3', price: '9' }
      ]
    }
  ];
 
  private cart = [];
 
  constructor() { }
 
  getProducts() {
    return this.data;
  }
 
  getCart() {
    return this.cart;
  }
 
  addProduct(product) {
    this.cart.push(product);
  }
}