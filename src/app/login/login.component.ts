import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { MyserviceService } from '../shared/services/myservice.service';
import Swal from "sweetalert2";

import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MyserviceService]
})
export class LoginComponent implements OnInit {
  msg = '';
  constructor(private service: MyserviceService, private routes: Router) { }

  check(uname: string, p: string) {
    this.service.checkusernameandpassword(uname, p).then((data: any) => {
      if (data) {
        if (data['acceso'] == true) {
          this.routes.navigate(['/starter']);
        } 
      } else {
         
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No tienes acceso al sistema'
          })
        
      }
    });

  }

  ngOnInit() {}
}
