import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class MyserviceService {

  constructor(private http: HttpClient) { }

  checkusernameandpassword(uname: string, pwd: string) {
    
    let url: string = environment.API_URL + "auth/login";
    let credentials = { 'correo': uname, 'password': pwd };
    let request = this.http.post(url, credentials);

    return new Promise((resolve, reject) => {
      request.subscribe((response) => {
        console.log("=================================");
        console.log(response);
        if (response) {
          let array = this.generateArray(response);
          localStorage.setItem('access_token', array[1]);
          resolve({'acceso': true});
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

