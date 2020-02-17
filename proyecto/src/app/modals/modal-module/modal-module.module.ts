import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapaPageModule } from "./../../pages/mapa/mapa.module";
import { ModalMapComponent } from "./../modal-map/modal-map.component";
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [ModalMapComponent],
  imports: [
    CommonModule,
    MapaPageModule,
    IonicModule
  ],
  exports: [ModalMapComponent]
})
export class ModalModuleModule { }

/*
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapaPageModule } from "./../../mapa/mapa.module";
import { ModalMapaComponent } from "./../modal-mapa/modal-mapa.component";
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [ModalMapaComponent],
  imports: [
    CommonModule,
    MapaPageModule,
    IonicModule
  ],
  exports: [ModalMapaComponent]
})
export class ModalMapaComponents { }


*/