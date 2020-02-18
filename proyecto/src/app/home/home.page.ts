import { Component } from '@angular/core';
import { Storage } from "@ionic/storage";
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  
  nombre:string="";
  apellido:string="";
  celular:string="";
  fechanacimiento:string="";
  email:string="";
  constructor(private storage:Storage) {
    this.cargarData();
  }

  cargarData() {
    this.storage.get('nombre').then(ref=>{this.nombre=ref});
    this.storage.get('apellido').then(ref=>{this.apellido=ref});
    this.storage.get('celular').then(ref=>{this.celular=ref});
    this.storage.get('fechanacimiento').then(ref=>{this.fechanacimiento=ref});
    this.storage.get('email').then(ref=>{this.email=ref});
  }

}
