import { Injectable } from '@angular/core';
import { AngularFirestore,AngularFirestoreCollection } from "angularfire2/firestore";
import { Historial } from "../shared/historial.interface";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EnviarFacturaService {
  
  private historialCollection: AngularFirestoreCollection<Historial>;
  private historiales: Observable<Historial[]>;
  
  constructor(public db :AngularFirestore) { 
    this.historialCollection= db.collection<Historial>('categoria');
  }

  async guardarPedido(data:Historial){
    try{
      return await this.db.collection('historial').add(data); 
    }
    catch(e){
      console.log("NO SE PUDO GUARDAR HISTORIAL EN LA BASE DE DATOS"+ e);
    }
  }

  filtrarporUsuario(userFilt: string) {
        
    //this.db.list('/candidates_list', ref => ref.orderByChild('email').equalTo('pranavkeke@gmail.com'));
    /*this.productosFiltrados = this.db.collection<Producto>('elementos', ref => ref.where('nombreCat','==', categoriFilt)).snapshotChanges().pipe(
      map(actions=>{
        return actions.map(a=>{
          const data=a.payload.doc.data();
          const id=a.payload.doc.id;
          return { id, ...data}
          });
        })
      );

    return this.productosFiltrados;*/
  }

  


}
