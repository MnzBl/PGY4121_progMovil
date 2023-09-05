import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { usuarios } from '../basedatos/lista';
import { AlertController } from '@ionic/angular';
import { loginInput } from './model/login.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public user: loginInput = {
    correo: "",
    psw: ""
  }

  public bdlista = usuarios;

  constructor(private router: Router,public btn:AlertController) { }

  ngOnInit() {
  }

  // const result = this.bdlista.find((usuario) => user.usuario === usuario.usuario && user.pwd === usuario.pwd)

  async alrtvacios(){

    let miAlerta = await this.btn.create({
      header: 'Anuncio',
      message: 'Todos los campos deben ser ingresados',
      buttons: ['OK']
    });
    miAlerta.present();

  }

  async alrtUserNoEncontrado(){

    let miAlerta = await this.btn.create({
      header: 'Anuncio',
      message: 'correo o contraseña incorrectos',
      buttons: ['OK']
    });
    miAlerta.present();

  }

  fnvalidaruser(user: loginInput){

    const result = this.bdlista.find((usuario) => user.correo === usuario.correo && user.psw === usuario.psw);

    if(!result){

      this.alrtUserNoEncontrado()
      return

    } else {

      console.log(result)
      this.router.navigate(['/home'])
      return result;

    }
    
  }

  fnvalidarvacios(user: loginInput){

    if(this.user.correo=="" || this.user.psw==""){

      this.alrtvacios()

    }else{

      this.fnvalidaruser(user)

    }

  }

}
