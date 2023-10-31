import { Component, OnInit } from '@angular/core';
import { DataService } from '../basedatos/datosLogin';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  public userLogin = {

    nombre: ""

  }

  //lbltexto = this.dataService.misDatos.nombre;

  constructor(private dataService: DataService,
    private router: Router) {
    let datos = this.dataService.misDatos;
    this.userLogin.nombre=datos.nombre;
    
  }

  ngOnInit() {

    console.log(this.userLogin.nombre)

  }

  fnLogOut() {

    this.dataService.reserMisDatos();
    this.router.navigate(['/login']);

  }

}
