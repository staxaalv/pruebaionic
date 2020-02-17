import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import {User} from "../shared/user.class";
import { AngularFirestore, } from 'angularfire2/firestore';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //public isLogged: any=false;
  
  constructor(public afAuth: AngularFireAuth,private db:AngularFirestore) { 
    //afAuth.authState.subscribe(user =>(this.isLogged=user));
  }

  /*async onLogin(user: User){
    try {
      return await this.afAuth.auth.signInWithEmailAndPassword(user.email,user.password);
    } catch (error) {
      if(error.name=="error"){
        console.log("errror por conexion");
      }
      else{
        console.log("Error: "+error);
      }
    }
  }*/

  public login(user:User) {
    return new Promise((resolve, rejected) => {
      this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password).then(res => {
        resolve(res.user);
      }).catch(err => {
        rejected(err);
      });
    });
  }


  logout() {
    return this.afAuth.auth.signOut();
  }
  
  async onRegister(user: User){
    let id:string;
    try {
      return await this.afAuth.auth.createUserWithEmailAndPassword(user.email,user.password);
      
    } catch (error) {
      console.log('ERROR EN REGISTER: ',error)
    }
  }

  async guardarDb(user:User, idUserCorreo:string){
   
    try {
    let data = {
      apellido: user.apellido,
      celular:user.celular,
      email:user.email,
      fechanacimiento:user.fechanacimiento,
      nombre: user.nombre,
    };
    return await this.db.collection('usuario').doc(idUserCorreo).set(data);
    }
    catch(error){
      console.log("NO SE PUDO GUARDAR EN LA BASE DE DATOS: ", error);
    }
    return null
  }
}
