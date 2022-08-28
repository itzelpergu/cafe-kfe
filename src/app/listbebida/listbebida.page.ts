import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from '@ionic/angular';
import { ProviderService } from 'src/providers/providerService';
import {HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';
import{ AlertController} from '@ionic/angular';


@Component({
  selector: 'app-list',
  templateUrl: 'listbebida.page.html',
  styleUrls: ['listbebida.page.scss']
})
export class ListbebidaPage {

    //Variables para almacenamiento
items:any;
 
bebida: any;

  constructor(public serv : ProviderService,
    public router : Router, public alertCtrl:AlertController) {
      this.getItemsBebida();
      this.getDatosBebida();
      
      
    }

    //initializa la variable que contiene los datos almacenados
    getItemsBebida() {
       this.bebida;
    }
    
    
    //Realiza el filtrado de los registros obtenido de la BD esto atravez del recorrido
    //de un recorrido que se realiza a "productos"
    getItems(ev:any){
      
      this.getItemsBebida();
      
      let val = ev.target.value;
      console.log(val);

      if(val && val.trim() != ''){
        this.bebida= this.bebida.filter((item)=>{
          return (item.nombre.toLowerCase().indexOf(val.toLowerCase())> -1);

          
        })
        
        err=>console.log(err);
        
      }
      
    }
    
  ngOnInit() {
  }
 //Realiza el consumó del metodo que se establece en el archivo "providerService.ts"
   getDatosBebida() {
      this.serv.getData().subscribe(data=> this.bebida= data,
        err => console.log(err)
      );
  }
 
//Muestra los datos recuperados para modificación mediante un popup     
 async editarBebida(req) {
   console.log(req);
    let alert = await this.alertCtrl.create({
      header: 'Editar Bebida',

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
            
        this.serv.modificarDatosbebida(params)
        .subscribe(data=>{
          console.log(data);
          //Realiza la petición de obtener los tados de la base de datos 
          //mediante el llamado del medoto "getDatos"
                           this.getDatosBebida();
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
       header: 'Eliminar Bebida',
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
         this.serv.eliminarBedida(item)
         .subscribe(data=>{
           console.log(data);
           //Lista de nueva cuenta los registro que se obtienen de la BD mediante el metodó "getDatos();"
                            this.getDatosBebida();
                        
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
 
