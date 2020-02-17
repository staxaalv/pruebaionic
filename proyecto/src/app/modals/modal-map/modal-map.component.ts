import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MapaPage } from "../../pages/mapa/mapa.page";

@Component({
  selector: 'app-modal-map',
  templateUrl: './modal-map.component.html',
  styleUrls: ['./modal-map.component.scss'],
})
export class ModalMapComponent implements OnInit {
  @Output() messageToEmit = new EventEmitter<any>();
  constructor(private modController:ModalController) { }

  ngOnInit() {}
  async presentModal() {
    const modal = await this.modController.create({
      component: MapaPage
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    this.messageToEmit.emit(data)
  }

}
