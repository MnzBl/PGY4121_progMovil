import { Injectable } from "@angular/core";

@Injectable()
export class DataService{
    public misDatos: any;

    constructor() {}

    reserMisDatos() {
        this.misDatos = null;
    }
}