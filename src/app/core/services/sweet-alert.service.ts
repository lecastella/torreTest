import { Injectable } from '@angular/core';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SweetAlertService {

  constructor() { }

  swalInfo(title: string, icon: SweetAlertIcon = 'success'): void {
    Swal.fire({
      icon,
      title,
      showConfirmButton: true,
      confirmButtonText: 'Aceptar'
    });
  }

  swalClose(): void {
    Swal.close();
  }
}
