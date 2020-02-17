import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ModalMapComponent } from "./modal-map.component";
import {MapaPageModule  } from "./../../pages/mapa/mapa.module";

@NgModule({
  declarations: [ModalMapComponent],
  imports: [
    CommonModule,
    IonicModule,
    MapaPageModule
  ],
  exports:[ModalMapComponent]
 
})
export class ModalMapModule {}