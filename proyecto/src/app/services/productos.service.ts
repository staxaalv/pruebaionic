import { Injectable } from '@angular/core';
import { AngularFirestore,AngularFirestoreCollection } from "angularfire2/firestore";
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
  private productosFiltrados: Observable<Producto[]>;
  constructor(private db:AngularFirestore) {
  }

  getProductos(){
    this.productoCollection= this.db.collection<Producto>('elementos');
    this.productos = this.productoCollection.snapshotChanges().pipe(
      map(actions=>{
        return actions.map(a=>{
          const data=a.payload.doc.data();
          const id=a.payload.doc.id;
          return { id, ...data}
          });
        })
      );
    
   return this.productos;
  }
  getProducto(id:string){
    return this.productoCollection.doc<Producto>(id).valueChanges();
  }
  
  filterBy(categoriFilt: string) {

    //this.db.list('/candidates_list', ref => ref.orderByChild('email').equalTo('pranavkeke@gmail.com'));
    this.productosFiltrados = this.db.collection<Producto>('elementos', ref => ref.where('nombreCat','==', categoriFilt)).snapshotChanges().pipe(
      map(actions=>{
        return actions.map(a=>{
          const data=a.payload.doc.data();
          const id=a.payload.doc.id;
          return { id, ...data}
          });
        })
      );

    return this.productosFiltrados;
  };

}


