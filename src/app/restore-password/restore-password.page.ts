import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-restore-password',
  templateUrl: './restore-password.page.html',
  styleUrls: ['./restore-password.page.scss'],
})
export class RestorePasswordPage implements OnInit {

  public psw = {

    correo:"",
    psw:"",
    cpsw:""

  }

  constructor(public btn:AlertController, private router: Router) { }

  ngOnInit() {
  }

  async alrtregistro(){

    let miAlerta = await this.btn.create({
      header: 'Anuncio',
      message: 'Contraseña actualizada',
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

  fnvalidarpsw(){

    if(this.psw.psw == this.psw.cpsw){

      this.alrtregistro()

    }else{

      this.alrterrorpsw()

    }

  }

  fnvalidarvacios(){

    if(this.psw.correo=="" || this.psw.psw=="" || this.psw.cpsw==""){

      this.alrtvacios()

    }else{

      this.fnvalidarpsw()

    }

  }

}
