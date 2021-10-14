import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class MapsService {

  constructor(private http: HttpClient) { }

  searchAddres(address: string) {
    
    let url: string = environment.API_URL + "usuarios/sendAddress";
    let credentials = { 'location': address };
    let access_token = localStorage.getItem('access_token');
    let request = this.http.post(url, credentials,{
      headers: new HttpHeaders({'x-token': `${access_token}`}),
      reportProgress: true
    });

    return new Promise((resolve, reject) => {
      request.subscribe((response) => {
        console.log(response);
        if (response) {
          let array = this.generateArray(response);
          resolve(array[0]);
        } else {
          resolve({'acceso': false});
        }
      }, (error: any) => {
        resolve(error.errors);
      });
    });
  }
  generateArray(obj: any){
    return Object.keys(obj).map((key)=>{ return obj[key]});
  }
}
