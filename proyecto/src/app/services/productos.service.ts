import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/firestore";
import { map } from "rxjs/operators";
import { message } from "../shared/message";
import { firestore } from 'firebase';
import { Observable } from 'rxjs';
import { Producto } from "../shared/product.interface";

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  private productoCollection: AngularFirestoreCollection<Producto>;
  private productos: Observable<Producto[]>;
  public prods:Producto[];

  constructor(private db:AngularFirestore) {
    
    this.productoCollection= db.collection<Producto>('elementos');
    this.productos=this.productoCollection.snapshotChanges().pipe(map(
      acctions =>{
        return acctions.map(a =>{
          console.log(a);
          const data = a.payload.doc.data();
          console.log(data);
          const id = a.payload.doc.id;
          return {id,...data};
        });
      }
    )); 
  }

  getCategorias(){
    this.productos.subscribe(
      res =>{
        this.prods = res;
      });
    return this.prods;
  }
  getCategoria(id:string){
    return this.productoCollection.doc<Producto>(id).valueChanges();
  }

}


