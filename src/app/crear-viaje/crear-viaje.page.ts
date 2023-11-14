import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { viajesInput } from './model/viaje';
import { sbapikey, sburl } from '../basedatos/keys';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DataService } from '../basedatos/datosLogin';


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
    id_conductor: 0 

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

  fnguardarviaje(){

    const headers = {"apikey": this.sbapikey};

    const url = this.sburl+"/rest/v1/viaje";

    this.http.post(url,this.viaje,{headers}).
        subscribe(res => console.log(res));

    this.router.navigate(['/home']);

  }

}
