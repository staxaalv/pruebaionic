import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Geolocation, Geoposition, GeolocationOptions } from '@ionic-native/geolocation/ngx';
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

  lat:number
  lon:number
  total:string

  constructor(private navController:NavController, private geolocation:Geolocation) { }

  ngOnInit() {
    this.getGeolocation();
    this.loadMap();
    console.log("latitud: "+this.lat+"    longitud: "+this.lon)
  }
  

  getGeolocation(){
    this.geolocation.getCurrentPosition().then((geoposition: Geoposition)=>{
      this.lat = geoposition.coords.latitude;
      this.lon = geoposition.coords.longitude;
    });
  }
  loadMap() {
    // create a new map by passing HTMLElement
    const mapEle: HTMLElement = document.getElementById('map');
    // create LatLng object
    const myLatLng = {lat: this.lat, lng: this.lon};
    // create map
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
      this.addMarker(marker);
    });
  }
  
  addMarker(marker: Marker) {
    return new google.maps.Marker({
      position: marker.position,
      map: this.map,
      title: marker.title
    });
  }



}
