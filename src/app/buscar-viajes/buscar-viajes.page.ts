import { Component, OnInit } from '@angular/core';
import { sbapikey, sburl } from '../basedatos/keys';
import { IbuscarViaje } from './modulo/modulo';
import { AlertController, NavController } from '@ionic/angular';
import { format } from 'date-fns';
import { Router } from '@angular/router';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DataService } from '../basedatos/datosLogin';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  standalone: true,
  selector: 'app-buscar-viajes',
  templateUrl: './buscar-viajes.page.html',
  styleUrls: ['./buscar-viajes.page.scss'],
  imports: [CommonModule, IonicModule]
})
export class BuscarViajesPage implements OnInit {

  public bdviajes: IbuscarViaje[] = [];

  private sburl = sburl;

  private sbapikey = sbapikey;

  public pasajero = {

    id_pasajero: 0,
    id_viaje: 0

  }

  constructor(private http: HttpClient,
              private dataService: DataService,
              public alertController:AlertController,
              private router: Router,
              private navCtrl: NavController) { }

  ngOnInit() {{}

  }
  

  async alrReservarCupo(i: number){


    const alert = await this.alertController.create({

      header: "¿Desea reservar un asiento en este viaje?",
      buttons: [
        {
          text: 'Aceptar',
          handler: () => {

            this.pasajero.id_pasajero = this.dataService.misDatos.id;
            this.pasajero.id_viaje = this.bdviajes[i].id_viaje;

            const headers = {"apikey": this.sbapikey};

            const url1 = this.sburl+"/rest/v1/viaje-pasajero";

            this.http.post(url1,this.pasajero,{headers}).
            subscribe(res => console.log(res));

            const cupos = this.bdviajes[i].cupos;
            const newCupos = cupos - 1;
            console.log(newCupos)

            const url2 = this.sburl+"/rest/v1/viaje?id=eq."+this.pasajero.id_viaje;

            this.http.patch(url2, {cupos: newCupos},{headers}).
            subscribe(res => console.log(res));

            this.router.navigate(['/home-pasajero'])

          }
        },
        'Cancelar'
      ]

    });

    await alert.present();

  }

  fnbuscarviajes(){

    const fecha = new Date();

    const fechaFormato = format(fecha, 'dd/MM/yy');

    const headers = {"apikey": this.sbapikey};

    const url = sburl+"/rest/v1/datos_viaje?fecha=eq."+fechaFormato;
      
    this.http.get<IbuscarViaje[]>(url,{headers}).subscribe((res) => {
      console.log(res);
      this.bdviajes = res;

    });

  }

  fnvolver(){
   
    this.router.navigate(['/home-pasajero'])
    
  }
  
  ionViewDidEnter(){

    this.fnbuscarviajes();

  }

}
