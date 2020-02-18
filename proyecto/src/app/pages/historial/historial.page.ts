import { Component, OnInit } from '@angular/core';
import { EnviarFacturaService } from "../../services/enviar-factura.service";
import { Historial } from "../../shared/historial.interface";
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-historial',
  templateUrl: './historial.page.html',
  styleUrls: ['./historial.page.scss'],
})
export class HistorialPage implements OnInit {
  public pedidos:Historial[];
  private userUid;
  constructor(private envFctSrv:EnviarFacturaService, private storage:Storage) { }

  ngOnInit() {
    this.obtenerListaFiltrada("jAYHRrearyOdhFUvbys3EbrWvOB3");
  }

  obtenerListaFiltrada(userId:string){
    this.storage.get('userUid').then(data=> {
      var x=this.envFctSrv.filtrarporUsuario(data).subscribe(ref =>{
        this.pedidos=ref;
        console.log(ref);
        });
    });
  }
}
