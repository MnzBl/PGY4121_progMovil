import {
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { sbapikey, sburl } from '../basedatos/keys';
import { IbuscarViaje } from './modulo/modulo';

import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';
import { format } from 'date-fns';
import * as L from 'leaflet';
import { DataService } from '../basedatos/datosLogin';

@Component({
  standalone: true,
  selector: 'app-buscar-viajes',
  templateUrl: './buscar-viajes.page.html',
  styleUrls: ['./buscar-viajes.page.scss'],
  imports: [CommonModule, IonicModule],
})
export class BuscarViajesPage implements OnInit {
  @ViewChild('map', { read: ElementRef }) mapElements!: QueryList<ElementRef>;

  public bdviajes: IbuscarViaje[] = [];

  private sburl = sburl;

  private sbapikey = sbapikey;

  public pasajero = {
    id_pasajero: 0,
    id_viaje: 0,
  };

  private map: any;

  constructor(
    private http: HttpClient,
    private dataService: DataService,
    public alertController: AlertController,
    private router: Router,
    private navCtrl: NavController
  ) {}

  ngOnInit() {
    {
    }
  }

  //cargarMapa(){

  //  if(this.mapContainer){

  //    const map = L.map(this.mapContainer.nativeElement).setView([-33.031644, -71.531004], 13);

  //    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  //    attribution: '© OpenStreetMap contributors',
  //    }).addTo(map);

  //  }

  //}

  //cargarMapaYRuta(){

  //  if(this.mapContainer){

  //  const map = L.map(this.mapContainer.nativeElement).setView([-33.031644, -71.531004], 13);

  //  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  //    attribution: '© OpenStreetMap contributors',
  //  }).addTo(map);

  //  this.bdviajes.forEach((viaje) => {
  //    this.mostrarRutaEnMapa(map, viaje);
  //  });
  //}
  //}

  //mostrarRutaEnMapa(map: L.Map, viaje: IbuscarViaje) {
  //  const start = L.latLng(viaje.lat_i, viaje.lon_i);
  //  const end = L.latLng(viaje.lat_f, viaje.lon_f);

  //  L.Routing.control({
  //    waypoints: [start, end],
  //    routeWhileDragging: true,
  //  }).addTo(map);
  //}

  async alrReservarCupo(i: number) {
    const alert = await this.alertController.create({
      header: '¿Desea reservar un asiento en este viaje?',
      buttons: [
        {
          text: 'Aceptar',
          handler: () => {
            this.pasajero.id_pasajero = this.dataService.misDatos.id;
            this.pasajero.id_viaje = this.bdviajes[i].id_viaje;

            const headers = { apikey: this.sbapikey };

            const url1 = this.sburl + '/rest/v1/viaje-pasajero';

            this.http
              .post(url1, this.pasajero, { headers })
              .subscribe((res) => console.log(res));

            const cupos = this.bdviajes[i].cupos;
            const newCupos = cupos - 1;
            console.log(newCupos);

            const url2 =
              this.sburl + '/rest/v1/viaje?id=eq.' + this.pasajero.id_viaje;

            this.http
              .patch(url2, { cupos: newCupos }, { headers })
              .subscribe((res) => console.log(res));

            this.router.navigate(['/home-pasajero']);
          },
        },
        'Cancelar',
      ],
    });

    await alert.present();
  }

  fnbuscarviajes() {
    const now = new Date();
    const nowDate = format(now, 'dd/MM/yy');
    const headers = { apikey: this.sbapikey };
    const url = sburl + '/rest/v1/datos_viaje';

    this.http.get<IbuscarViaje[]>(url, { headers }).subscribe((res) => {
      this.bdviajes = res.filter((viaje) => {
        const fecha = new Date(viaje.fecha);
        const fechaStr = `${fecha.getDate().toString().padStart(2, '0')}/${
          fecha.getMonth() + 1
        }/${fecha.getFullYear().toString().substring(2)}`;
        return fechaStr === nowDate;
      });
    });
  }

  fnvolver() {
    this.router.navigate(['/home-pasajero']);
  }

  ionViewDidEnter() {
    this.fnbuscarviajes();

    //  this.cargarMapa();
  }

  ngAfterViewInit() {
    if (this.mapElements && this.mapElements.length > 0) {
      this.mapElements.forEach((mapElement, index) => {
        const map = new L.Map(mapElement.nativeElement).setView(
          [-33.031644, -71.531004],
          13
        );
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19,
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(map);
      });
    } else {
      console.error('No se encontraron elementos de mapa.');
    }
  }
}
