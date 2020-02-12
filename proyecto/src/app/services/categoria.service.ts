import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/firestore";
import { Category } from "../shared/category.interface";
import { map } from "rxjs/operators";
import { message } from "../shared/message";
import { firestore } from 'firebase';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  private categoriaCollection: AngularFirestoreCollection<Category>;
  private categorias: Observable<Category[]>;


  constructor(private db:AngularFirestore) {  
    this.categoriaCollection= db.collection<Category>('categoria');
    this.categorias=this.categoriaCollection.snapshotChanges().pipe(map(
      acctions =>{
        return acctions.map(a =>{
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id,...data};
        });
      }
    )); 
  }

  getCategorias(){
    return this.categorias;
  }
  getCategoria(id:string){
    return this.categoriaCollection.doc<Category>(id).valueChanges();
  }

  /*getallCategories(){
    return this.db.collection('categoria').snapshotChanges();
  }*/

  /*getAllCategories(){
    return this.db.collection('categoria').snapshotChanges().pipe(map(rooms => {
      return rooms.map(a =>{
        const data = a.payload.doc.data() as Category;
        data.id = a.payload.doc.id;
        return data;
      })
    }));*/
  }
