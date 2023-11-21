import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { loginInput } from './model/login.model';
import { sbapikey, sburl } from '../basedatos/keys';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DataService } from '../basedatos/datosLogin';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public loginuser: loginInput = {
    correo: "",
    psw: "",
    usuario: ""
  }

  public bduser = {
    id: "",
    nombre: "",
    correo: "",
    psw: ""
  }


  private sburl = sburl;

  private sbapikey = sbapikey;

  constructor(private router: Router,
              public btn:AlertController,
              private http: HttpClient,
              private dataService: DataService) { }

  ngOnInit() {
  }

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

  fnvalidaruser(loginuser: loginInput){

    const headers = {"apikey": this.sbapikey};

    const correo = this.loginuser.correo;
    const psw = this.loginuser.psw;
    const tipousuario = this.loginuser.usuario;

    console.log(loginuser)

    if (tipousuario=="pasajero"){

    const url = this.sburl+"/rest/v1/pasajero?correo=eq."+correo;

    console.log(url);

    this.http.get<any>(url,{headers}).subscribe((res) => {
      console.log(res);
      this.bduser = res[0];

      console.log(correo+"-"+this.bduser.correo)
      console.log(psw+"-"+this.bduser.psw)
      
      if(correo==this.bduser.correo && psw==this.bduser.psw){

        console.log("si coinciden");

        this.dataService.misDatos = res[0];
        console.log(this.dataService.misDatos.id_pasajero)

        this.router.navigate(['/home-pasajero']);

        this.loginuser.correo="";
        this.loginuser.psw="";
        this.loginuser.usuario="";

      } else {

        console.log("error en las contraseñas")
  
      }

    });
 
    } else if (tipousuario=="conductor"){

      const url = this.sburl+"/rest/v1/conductor?correo=eq."+correo;

      console.log(url);

    this.http.get<any>(url,{headers}).subscribe(res => {
      console.log(res);
      this.bduser = res[0];
    
      console.log(correo+"-"+this.bduser.correo)
      console.log(psw+"-"+this.bduser.psw)

      if(correo==this.bduser.correo && psw==this.bduser.psw){

        console.log("si coinciden");

        this.dataService.misDatos = res[0];
        console.log(this.dataService.misDatos.id_pasajero)

        this.router.navigate(['/home']);

        this.loginuser.correo="";
        this.loginuser.psw="";
        this.loginuser.usuario="";

      } else  {

        console.log("error en las contraseñas")

      }
    
    });

  }
    
  }

  fnvalidarvacios(loginuser: loginInput){

    if(this.loginuser.correo=="" || this.loginuser.psw==""){

      this.alrtvacios()

    }else{

      this.fnvalidaruser(loginuser)

    }

  }

}
