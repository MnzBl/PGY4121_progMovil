import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { usuarios } from '../basedatos/lista';
import { AlertController } from '@ionic/angular';
import { loginInput } from './model/login.model';

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


  private sburl = "https://agjhsdqlwgqzokelqqrd.supabase.co";

  private sbapikey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFnamhzZHFsd2dxem9rZWxxcXJkIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTU0ODUyNzksImV4cCI6MjAxMTA2MTI3OX0.RAzy6n71Wfv7CQi9acKyaqGy9YPAg4lSPpvfqcjbZik";

  constructor(private router: Router,
              public btn:AlertController,
              private http: HttpClient,
              private dataServide: DataService) { }

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

        this.dataServide.misDatos = res[0];

        this.router.navigate(['/home']);

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

        this.dataServide.misDatos = res[0];

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
