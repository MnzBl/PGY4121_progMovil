import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { viajesInput } from './model/viaje';
import { sbapikey, sburl } from '../basedatos/keys';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DataService } from '../basedatos/datosLogin';
import { format } from 'date-fns';


@Component({
  selector: 'app-crear-viaje',
  templateUrl: './crear-viaje.page.html',
  styleUrls: ['./crear-viaje.page.scss'],
})
export class CrearViajePage implements OnInit {

  public viaje: viajesInput = {

    trayecto_i: "",
    trayecto_f: "",
    tarifa: 0,
    hora: "",
    id_conductor: 0,
    lat_i: 0,
    lon_i: 0,
    lat_f: 0,
    lon_f: 0
  }

  private sburl = sburl;

  private sbapikey = sbapikey;

  constructor(private router: Router,
              private http: HttpClient,
              private dataService: DataService) {
                let datos = this.dataService.misDatos;
                this.viaje.id_conductor = datos.id;
               }

  ngOnInit() {
  }

  fnsalir(){

    this.router.navigate(['/home']);

  }

  fnguardarviaje(direccion_i : string, direccion_f : string){

    const headers = {"apikey": this.sbapikey};

    const url = this.sburl+"/rest/v1/viaje";

    const region = " Valparaiso";

    const direccionCompleta_i = direccion_i+region;
    const direccionCompleta_f = direccion_f+region;

    const UrlCoordenadas1 = "https://nominatim.openstreetmap.org/search?q=${";
    const UrlCoordenadas2 = "}&format=json";

    const UrlCoordenadasCompleta_i = UrlCoordenadas1+direccionCompleta_i+UrlCoordenadas2; 
    const UrlCoordenadasCompleta_f = UrlCoordenadas1+direccionCompleta_f+UrlCoordenadas2; 

    this.http.get<any[]>(UrlCoordenadasCompleta_i).subscribe((res) => {
      if (res.length > 0) {
        
        this.viaje.lat_i = res[0].lat;
        this.viaje.lon_i = res[0].lon;
  
        console.log('Latitud:', this.viaje.lat_i);
        console.log('Longitud:', this.viaje.lon_i);

        this.http.get<any[]>(UrlCoordenadasCompleta_f).subscribe((res) => {
          if (res.length > 0) {
            
            this.viaje.lat_f = res[0].lat;
            this.viaje.lon_f = res[0].lon;
      
            console.log('Latitud:', this.viaje.lat_f);
            console.log('Longitud:', this.viaje.lon_f);
            
            this.http.post(url,this.viaje,{headers}).
            subscribe(res => console.log(res));
    
            this.router.navigate(['/home']);
    
          } else {
    
            console.error('No se encontraron coordenadas para la dirección proporcionada.');
    
          }
    
        });  

      } else {

        console.error('No se encontraron coordenadas para la dirección proporcionada.');

      }

    });  

  }

}
