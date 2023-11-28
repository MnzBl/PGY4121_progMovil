import { Component, OnInit } from '@angular/core';
import { Map, tileLayer } from 'leaflet';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss'],
})
export class MapaPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit(): void{

    const map = new Map('map').setView([-33.031644, -71.531004], 19);
    tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

  }

}
