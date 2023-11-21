import { Component, OnInit } from '@angular/core';
import { DataService } from '../basedatos/datosLogin';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { sbapikey, sburl } from '../basedatos/keys';

import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  public userLogin = {

    nombre: "",
    correo: ""

  }

  public bd = []

  private sburl = sburl;

  private sbapikey = sbapikey;
  
  constructor(private dataService: DataService,
    private router: Router,
    private http: HttpClient,
    private alertController: AlertController) {
    let datos = this.dataService.misDatos;
    this.userLogin.nombre=datos.nombre;
    this.userLogin.correo=datos.correo;
    
  }

  ngOnInit() {

  }

  async alrPasajero(){

    const alert = await this.alertController.create({

      header: "Al parecer no tienes una cuenta de Pasajero ¿Quieres crear una?",
      buttons: [
        {
          text: 'Sí',
          handler: () => {
            this.router.navigate(['/registro']);
          }
        },
        'Cancelar'
      ]

    });

    await alert.present();

  }

  fnLogOut() {

    this.dataService.resetMisDatos();
    this.router.navigate(['/login']);

  }

  fnPasajero(){

    const headers = {"apikey": this.sbapikey};

    const url = this.sburl+"/rest/v1/pasajero?correo=eq."+this.userLogin.correo;

    console.log(url);

    this.http.get<any>(url,{headers}).subscribe((res) => {
      console.log(res);
      this.bd=res;
      console.log(this.bd.length);

      if(this.bd.length==0){

        this.alrPasajero();

      } else {

        this.router.navigate(['/home-pasajero']);
        console.log(this.dataService.misDatos)
        this.dataService.misDatos = res[0];
        console.log(this.dataService.misDatos)

      }

    });

  }

  fnCrearViajes(){

    this.router.navigate(['/crear-viaje']);

  }

}
