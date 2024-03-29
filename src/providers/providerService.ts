import { Injectable } from '@angular/core';
import{HttpHeaders, HttpHeaderResponse,HttpResponse, HttpClient} from '@angular/common/http'
import { HttpModule, RequestOptions } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { Http,Headers,Response} from '@angular/http'
import {catchError, tap, map} from 'rxjs/operators';
import { Observable,throwError,of} from 'rxjs';
import 'rxjs/add/operator/map';

// Realiza llamado de los appi-rest 
@Injectable({
  providedIn: 'root'
}) 
export class ProviderService {
    

 

  constructor(public http: HttpClient) {
     
  }
  options={
    headers: new HttpHeaders({'Content-type': 'application/json'})
  };
  api:string='http://localhost/appi-rest/';

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      
      console.error(error);
      return of(result as T);
    };
  }
    private extractData(res: Response) {
    let body= res;
    return body ||{};
    }


 //Obtiene los datos de la base de datos
    getData(){
      return this.http.
      get(this.api + 'listadobebida.php',this.options).pipe(map(this.extractData));
      
    }

    //Obtiene los datos de bebida de la base de datos
    getBebida(){
      return this.http.
      get(this.api + 'listadobebida.php',this.options).pipe(map(this.extractData));
      
    }
  //Crea un nuevo registro en la base datos con el archivo"insert.php"
    registrarDatos(data){ 
     return this.http.post(this.api+'insert.php',data,this.options);
      
    }

    /* //Crea un nuevo registro de bebida en la base datos con el archivo"insert.php"
    registrarBebida(data){ 
      return this.http.post(this.api+'insert_bebida.php',data,this.options);
       
     } */

  //Realiza la modificación de datos mediante el id del registro esto atravez del archivo "update.php"
  //que conecta la base de datos y la aplicación
    modificarDatos(datas){
      return this.http.put(this.api+'update.php',datas,{
         headers: new HttpHeaders().set('Content-Type', 'application/json'),
         responseType: 'text' 
      }
   );
    }
//Realiza eliminación de bebida mediante php
    eliminarBedida(datas) {
      return this.http.put(this.api+'deletebebida.php',datas,{
        headers: new HttpHeaders().set('Content-Type', 'app'),
        responseType: 'text'
      })
  }

//se hace llamado de los metodos y consumo appi rest para modificar bebida
    modificarDatosbebida(datas){
      //Se envia los datos a la DB mediante PHP
      return this.http.put(this.api+'update.php',datas,{
         headers: new HttpHeaders().set('Content-Type', 'application/json'),
         responseType: 'text' 
      }
   );
    }

    
  //Realiza la eliminacion de un registro de platillo enviando el id del registro usando el archivo "delete.php"
    eliminarPlatillo(datas){
    return this.http.put(this.api+'delete.php',datas,{
       headers: new HttpHeaders().set('Content-Type', 'application/json'),
       responseType: 'text' 
    }
 );
 
  
          }
}
