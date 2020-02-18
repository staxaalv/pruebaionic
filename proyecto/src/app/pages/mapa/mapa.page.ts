import { Component, OnInit } from '@angular/core';
import { NavController,ModalController} from '@ionic/angular';
//import { Geolocation, Geoposition, GeolocationOptions } from '@ionic-native/geolocation/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
declare var google;

interface Marker {
  position: {
    lat: number,
    lng: number,
  };
  title: string;
}


@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss'],
})
export class MapaPage implements OnInit {
  map=null;

  public lat:number=-2.160103;
  public lon:number=-79.8856715;
  total:string;

  constructor(private navController:NavController, private geolocation:Geolocation, private modalController:ModalController) { 
    this.geolocation.getCurrentPosition().then((resp) => {
      this.lat=Number(resp.coords.latitude);
      this.lon=(resp.coords.longitude);
      //console.log(this.lat+","+this.lon);
    }).catch((error) => {
      console.log('Error getting location', error);
    });
   
  }

  ngOnInit() {
    this.loadMap();
  }
  
  loadMap() {
   
    const mapEle: HTMLElement = document.getElementById('map');
   
    const myLatLng = {lat: this.lat, lng: this.lon};
   
    this.map = new google.maps.Map(mapEle, {
      center: myLatLng,
      zoom: 12
    });
  
    google.maps.event.addListenerOnce(this.map, 'idle', () => {
      mapEle.classList.add('show-map');

      const marker={
        position:{
          lat:this.lat,
          lng:this.lon
        },
        title:"punto 1"
      };
      var macador=this.addMarker(marker);
      
    });
  }
  
  addMarker(marker: Marker) {
    var marcador= new google.maps.Marker({
      position: marker.position,
      draggable:true,
      map: this.map,
      title: marker.title
      
    });
    marcador.addListener('dragend', ref=>{
      this.lon=ref.latLng.lng();
      this.lat=ref.latLng.lat();
      //console.log("latitud: "+this.lat+"longitud: "+this.lon)
    });
  }

  dismiss() {
    this.modalController.dismiss({
      'dismissed': true,
      "ubicacion": {
        lat: this.lat,
        lng: this.lon
      }
    });
  }

  


}
