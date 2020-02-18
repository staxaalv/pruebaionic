import { Injectable } from '@angular/core';
import { AngularFirestore,AngularFirestoreCollection } from "angularfire2/firestore";
import { Historial } from "../shared/historial.interface";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EnviarFacturaService {
  
  private historialCollection: AngularFirestoreCollection<Historial>;
  private historiales: Observable<Historial[]>;
  private historialesFiltrados:Observable<Historial[]>;
  
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
    return this.db.collection<Historial>('historial', ref => ref.where('clienteid','==', userFilt)).snapshotChanges().pipe(
      map(actions=>{
        console.log(actions)
        return actions.map(a=>{
          console.log(a)
          let data:any=a.payload.doc.data();
          let variable={id:a.payload.doc.id,
                        clienteid:data.clienteid,
                        descuento:data.descuento,
                        fecha:new Date(data.fecha.seconds*1000),
                        productos:data.productos,
                        totalPago:data.totalPago
                        };
          console.log(typeof(data.fecha.seconds))
          console.log(data.fecha.seconds)
          return variable;
          });
        }));
    }

  


}
