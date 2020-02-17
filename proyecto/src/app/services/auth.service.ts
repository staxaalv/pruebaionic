import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import {User} from "../shared/user.class";
import { AngularFirestore } from 'angularfire2/firestore';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isLogged: any=false;
  
  constructor(public afAuth: AngularFireAuth,private db:AngularFirestore) { 
    afAuth.authState.subscribe(user =>(this.isLogged=user));
  }

  async onLogin(user: User){
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
  }
  
  async onRegister(user: User){
    try {
      return await this.afAuth.auth.createUserWithEmailAndPassword(user.email,user.password);
    } catch (error) {
      console.log('ERROR EN REGISTER: ',error)
    }
  }
}
