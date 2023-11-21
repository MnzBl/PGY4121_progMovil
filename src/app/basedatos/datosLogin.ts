import { Injectable } from "@angular/core";

@Injectable()


export class DataService{
    public misDatos: any;

    constructor() {}

    resetMisDatos() {
        this.misDatos = null;
    }
}