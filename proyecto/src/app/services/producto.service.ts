import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/firestore";
import { Producto } from "../shared/product.interface";
import { map } from "rxjs/operators";
import { message } from "../shared/message";
import { firestore } from 'firebase';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  public idCategoria:String;
  private productoCollection: AngularFirestoreCollection<Producto>;
  private productos: Observable<Producto[]>;
  
  constructor(public db:AngularFirestore) { 
    console.log("idProducto en Servicio:"+ this.idCategoria);
    
    if(this.idCategoria=="Mn64ZjFXSJ8CjgDABAo8"){
      this.selectConSeccion("celular");
    }else if(this.idCategoria=="UagW7PgZDdxjfCikzlOc"
      ){
        this.selectConSeccion("bebida");
    }
    else if(this.idCategoria=="wfwr07SVPNzpXZtvgnLx"){
      this.selectConSeccion("computadora");
    }

     
  }

  public selectConSeccion(categoriaNombre:string){
    this.productoCollection= this.db.collection<Producto>(categoriaNombre);
    this.productos=this.productoCollection.snapshotChanges().pipe(map(
      acctions =>{
        return acctions.map(a =>{
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id,...data};
        });
      }
    ));
  }
  

  public inService(idCategoria:String){
    this.idCategoria=idCategoria;
  }

  getProdutos(){
    return this.productos;
  }
  getProductos(id:string){
    return this.productoCollection.doc<Producto>(id).valueChanges();
  }

  

}
