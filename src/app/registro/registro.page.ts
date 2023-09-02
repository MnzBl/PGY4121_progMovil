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
    psw2:""
  }

  constructor(public btn:AlertController, private router: Router) { }

  ngOnInit() {

    }

    async fnbtnregistro(){

      let miAlerta = await this.btn.create({
        header: 'Anuncio',
        message: 'Cuenta creada',
        buttons: ['OK']
      });
      miAlerta.present();
  
      this.router.navigate(['/login'])
  
    }  

  async errorpsw(){

    let miAlerta = await this.btn.create({
      header: 'Anuncio',
      message: 'Las contraseñas no coinciden',
      buttons: ['OK']
    });
    miAlerta.present();


  }

  validarpsw(){

    if(this.registrar.psw1 == this.registrar.psw2){

      this.fnbtnregistro()

    }else{

      this.errorpsw()

    }

  }

}
