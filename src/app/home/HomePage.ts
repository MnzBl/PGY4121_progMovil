import { Component, OnInit } from '@angular/core';
import { DataService } from '../basedatos/datosLogin';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

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

  private sburl = "https://agjhsdqlwgqzokelqqrd.supabase.co";

  private sbapikey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFnamhzZHFsd2dxem9rZWxxcXJkIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTU0ODUyNzksImV4cCI6MjAxMTA2MTI3OX0.RAzy6n71Wfv7CQi9acKyaqGy9YPAg4lSPpvfqcjbZik";

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

      header: "Al parecer no tienes una cuenta de Conductor ¿Quieres crear una?",
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

    this.dataService.reserMisDatos();
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

      if(this.bd.length=0){

        this.alrPasajero();

      } else {

        this.router.navigate(['/home-pasajero']);

      }

    });

  }

}
