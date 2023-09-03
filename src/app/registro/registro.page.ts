import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  public registrar= {
    nombre:"",
    correo:"",
    psw1:"",
    psw2:"",
    usuario:""
  }

  public lista = [this.registrar]

  constructor(public btn:AlertController, private router: Router) { }

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

  fnvalidarpsw(){

    if(this.registrar.psw1 == this.registrar.psw2){

      this.alrtregistro()

    }else{

      this.alrterrorpsw()

    }

  }

  fnvalidarusuario(){

    if(this.registrar.usuario!="chofer" && this.registrar.usuario!="pasajero"){

      this.alrterrorusuario()

    }else{

      this.fnvalidarpsw()

    }

  }

  fnvalidarvacios(){

    if(this.registrar.nombre=="" || this.registrar.correo=="" || this.registrar.psw1=="" || this.registrar.psw2==""){

      this.alrtvacios()

    }else{

      this.fnvalidarusuario()

    }

  }

}
