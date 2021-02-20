import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { SweetAlertService } from './../../core/services/sweet-alert.service';
import { TorreServicesService } from './../../core/services/torre-services.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user = new FormControl('', Validators.required);
  isSubmitted = false;
  loading = false;

  constructor(
    private TorreServicesService: TorreServicesService,
    private sweetAlertService: SweetAlertService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
  }

  async getProfile() {
    try {
      this.spinner.show();
      const request = await this.TorreServicesService.getProfile(this.user.value);
      this.spinner.hide();
    } catch (error) {
      this.spinner.hide();
      this.sweetAlertService.swalInfo(
        'Usuario no encontrado. Por favor, introduzca un usuario válido',
        'error'
      );
    }
  }

  onSubmit() {
    this.isSubmitted = true;

    if (!this.user.valid) {
      return
    }

    this.getProfile();
  }

}
