import { Component, AfterViewInit } from '@angular/core';
import { MapsService } from '../shared/services/maps.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from "sweetalert2";

@Component({
  selector: 'app-starter',
  templateUrl: './starter.component.html',
  styleUrls: ['./starter.component.scss'],
  providers: [MapsService]
})
export class StarterComponent {
  title = 'My first AGM project';
  lat = 51.678418;
  lng = 7.809007;
  constructor(private mapsService: MapsService,
              public snackBar: MatSnackBar) { }
  
  searchAddres(address: string) {
    this.mapsService.searchAddres(address).then((data: any) => {
      if (data.hasOwnProperty('lat')) {
        console.log(data);
        this.lat = data["lat"];
        this.lng = data["lng"];
        this.snackBar.open('Ubicando direccion', 'Hecho!!!', {
          duration: 2000
      });
      } else {
         
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No se encontro ubicacion para esta direccion'
          })
        
      }
    });

    
  }
}
