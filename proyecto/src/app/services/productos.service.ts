import { Injectable } from '@angular/core';
import { CategoriaService } from "../services/categoria.service";
import { Category } from "../shared/category.interface";
import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/firestore";
import { map } from "rxjs/operators";
import { message } from "../shared/message";
import { firestore } from 'firebase';
import { Observable } from 'rxjs';
import { Producto } from "../shared/product.interface";
import { element } from 'protractor';
@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  private datos=[];
  private productoCollection: AngularFirestoreCollection<Producto>;
  private productos: Observable<Producto[]>;
  private categorias:Observable<Category[]>;
  
  private lp=[];
  
  constructor(public categoriaService:CategoriaService,private db:AngularFirestore) { 
    this.categorias=this.categoriaService.getCategorias();
    
    //db.collection('families').where('users_exists.john', '==', true)
    
    //this.productoCollection= db.collection<Producto>('elementos');
    this.productos=this.productoCollection.snapshotChanges().pipe(map(
      acctions =>{
        return acctions.map(a =>{
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id,...data};
          });
        }
      ));
        
        let queryRef=conec.
      
    
    


  

    
  }

  devuelvelistaformada(){
    return this.datos;
  }


  getProductos(){
    return this.productos;
  }
  getProducto(id:string){
    return this.productoCollection.doc<Producto>(id).valueChanges();
  }
}

