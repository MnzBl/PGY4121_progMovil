import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { registerInput } from './model/registro.model';
import { usuarios } from '../basedatos/lista';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { sbapikey, sburl } from '../basedatos/keys';
import { from } from 'rxjs';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  public registrar: registerInput = {
    nombre:"",
    correo:"",
    psw1:"",
    psw2:"",
    usuario:""
  }

  public nuevoUsuario = {
    nombre: "",
    correo: "",
    psw: ""
  }

  public lista = usuarios;

  private sburl = sburl;

  private sbapikey = sbapikey;
  
  users = []

  constructor(public btn:AlertController,
              private router: Router,
              private http: HttpClient) { }

  ngOnInit() {

  }

  async alrtregistro(){

    let miAlerta = await this.btn.create({
      header: 'Anuncio',
      message: 'Cuenta creada',
      buttons: ['OK']
    });
    miAlerta.present();
  
    this.router.navigate(['/login'])
  
  }  

  async alrterrorpsw(){

    let miAlerta = await this.btn.create({
      header: 'Anuncio',
      message: 'Las contraseñas no coinciden',
      buttons: ['OK']
    });
    miAlerta.present();

  }

  async alrtvacios(){

    let miAlerta = await this.btn.create({
      header: 'Anuncio',
      message: 'Todos los campos deben ser ingresados',
      buttons: ['OK']
    });
    miAlerta.present();

  }

  async alrterrorusuario(){

    let miAlerta = await this.btn.create({
      header: 'Anuncio',
      message: 'Elegir tipos de usuario',
      buttons: ['OK']
    });
    miAlerta.present();

  }

  fnvalidarpsw(usuarioARegistar: registerInput){

    const headers = {"apikey": this.sbapikey};

    if(this.registrar.psw1 == this.registrar.psw2){
      this.nuevoUsuario.nombre = usuarioARegistar.nombre;
      this.nuevoUsuario.correo = usuarioARegistar.correo;
      this.nuevoUsuario.psw = usuarioARegistar.psw1;

      if (this.registrar.usuario=="pasajero"){

        const url = this.sburl+"/rest/v1/pasajero";

        this.http.post(url,this.nuevoUsuario,{headers}).
        subscribe(res => console.log(res));

        this.alrtregistro()

      } else if (this.registrar.usuario=="conductor"){

        const url = this.sburl+"/rest/v1/conductor";

        this.http.post(url,this.nuevoUsuario,{headers}).
        subscribe(res => console.log(res));

        this.alrtregistro()

      }

    }else{

      this.alrterrorpsw()

    }

  }

  fnvalidarusuario(usuario: registerInput){

    if(this.registrar.usuario!="conductor" && this.registrar.usuario!="pasajero"){

      this.alrterrorusuario()

    }else{

      this.fnvalidarpsw(usuario)

    }

  }

  fnvalidarvacios(usuario: registerInput){

    if(this.registrar.nombre=="" || this.registrar.correo=="" ||
     this.registrar.psw1=="" || this.registrar.psw2==""){

      this.alrtvacios()

    }else{

      this.fnvalidarusuario(usuario)

    }

  }

   


}
