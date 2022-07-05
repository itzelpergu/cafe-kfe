import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from '@ionic/angular';
import { ProviderService } from 'src/providers/providerService';
import {HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';
import{ AlertController} from '@ionic/angular';
import { text } from '@angular/core/src/render3';
import { FormControl } from "@angular/forms";
@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage {

items:any;
 
productos: any;

  constructor(public serv : ProviderService,
    public router : Router, public alertCtrl:AlertController) {
      this.getItemsPlatillo();
      this.getDatos();
      
      
    }
    //initializa la variable que contiene los datos almacenados
    getItemsPlatillo(){
       this.productos;
        
    }
    //Realiza el filtrado de los registros obtenido de la BD esto atravez del recorrido
    //de un recorrido que se realiza a "productos"
    getItems(ev:any){
      
      this.getItemsPlatillo();
      
      let val = ev.target.value;
      console.log(val);

      if(val && val.trim() != ''){
        this.productos= this.productos.filter((item)=>{
          return (item.nombre.toLowerCase().indexOf(val.toLowerCase())> -1);

          
        })
        
        err=>console.log(err);
        
      }
      
    }
    
  ngOnInit() {
  }
 //Realiza el consumó del metodo que se establece en el archivo "providerService.ts"
   getDatos() {
      this.serv.getData().subscribe(data=> this.productos= data,
        err => console.log(err)
      );
  }
 
//Muestra los datos recuperados para modificación mediante un popup     
 async editarPlatillo(req) {
   console.log(req);
    let alert = await this.alertCtrl.create({
      header: 'Editar Platillo',

      inputs: [
        {
          name: 'nombre',
          placeholder: 'Nombre',
          value: req.nombre
        },
        {
          name: 'precio',
          placeholder: 'Precio',
          value: req.precio
        },
        {
          name:'descripcion',
          placeholder:'Precio',
          value:req.descripcion
        }
      ],
      buttons: [
        {
          //Opción que cancela la acción de modificar
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          //Opción que realiza el envio de los nuevos datos modificados del registro obtenido
          text: 'Aceptar',
          handler: data => {
            
            let params:any={
                         id:req.id,
                         nombre:data.nombre,
                         precio:data.precio,
                         descripcion:data.descripcion
                       }
            
        this.serv.modificarDatos(params)
        .subscribe(data=>{
          console.log(data);
          //Realiza la petición de obtener los tados de la base de datos 
          //mediante el llamado del medoto "getDatos"
                           this.getDatos();
          //Invoca el mensaje de notificación de datos modificados
                           this.showAlert(data);
                         },
                         err=>console.log(err)
                       );
          }
        }
      ]
    });
    alert.present();
  }
//Metodó de creación de un mensaje de notificación
 async showAlert(men){
    const alert = await this.alertCtrl.create({
      header:'Se Modifico',
     
      buttons:['ok']
    });
    alert.present();
  }

//Realizá la eliminación de registro en la base de datos
  async eliminar(item) {
    console.log(item);
     let alert = await this.alertCtrl.create({
       header: 'Eliminar Platillo',
       buttons: [
         {
           //Opción de cancelar la acción de eliminar
           text: 'No',
           role: 'cancel',
           handler: data => {
             console.log('Cancel clicked');
           }
         },
         {
           text: 'Si',
           role: 'destructive',
           handler: data => {
           //Realizá el llamado del metodó de eliminar que se
           // creó en el archivo "providerService.ts" el cual realiza la conexión a BD  
         this.serv.eliminarPlatillo(item)
         .subscribe(data=>{
           console.log(data);
           //Lista de nueva cuenta los registro que se obtienen de la BD mediante el metodó "getDatos();"
                            this.getDatos();
                        
                          },
                          err=>console.log(err)
                        );
           }
         }
       ]
     });
     alert.present();
   }



}
 
