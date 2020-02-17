import { Component, OnInit } from '@angular/core';
import { EnviarFacturaService } from "../../services/enviar-factura.service";
@Component({
  selector: 'app-historial',
  templateUrl: './historial.page.html',
  styleUrls: ['./historial.page.scss'],
})
export class HistorialPage implements OnInit {

  constructor(private envFctSrv:EnviarFacturaService) { }

  ngOnInit() {
  }

 
}
