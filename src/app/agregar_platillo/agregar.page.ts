import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, AlertController } from '@ionic/angular';
import {HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';
import { ProviderService } from 'src/providers/providerService';

@Component({
  selector: 'app-home',
  templateUrl: 'agregar.page.html',
  styleUrls: ['agregar.page.scss'],
})
export class AgregarPage  {

  nombre ="";
  precio="";
  descripcion="";
  

  constructor(
    public service : ProviderService,
    public router : Router) {

    }

  
  //Realizá el envio de datos para el nuevo registro de en la BD
  //Esto atravez de la llamada del metodo "registrarDatos();" establecido el archivo "providerService.ts"
  agregar(){
    console.log(this.nombre);
    this.service.registrarDatos
    ({nombre:this.nombre,precio:this.precio,descripcion:this.descripcion})
    .subscribe(data=>{

      //Realiza el reset despues de agregar los datos
      this.nombre ="";
      this.precio="";
      this.descripcion="";

          console.log(data);
          
          
    },

    error=>console.log(error)
    );
    
  }


    
}

