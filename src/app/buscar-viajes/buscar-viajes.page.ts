import { Component, OnInit } from '@angular/core';
import { sbapikey, sburl } from '../basedatos/keys';
import { IbuscarViaje } from './modulo/modulo';

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

  public pasajesdisponibles = 4;

  constructor(private http: HttpClient,
              private dataService: DataService) { }

  ngOnInit() {{}
  }

  fnbuscarviajes(){

    const headers = {"apikey": this.sbapikey};

    const url = sburl+"/rest/v1/datos_viajes";
      
    this.http.get<IbuscarViaje[]>(url,{headers}).subscribe((res) => {
      console.log(res);
      this.bdviajes = res;

  });
}

  
  ionViewDidEnter(){

    this.fnbuscarviajes();

    console.log("prbando probando")

  }

}
