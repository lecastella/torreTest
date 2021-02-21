import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { SweetAlertService } from './../../core/services/sweet-alert.service';
import { TorreServicesService } from './../../core/services/torre-services.service';
import { DataService } from './../../core/services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user = new FormControl('', Validators.required);
  opportunity = new FormControl('', Validators.required);
  isSubmitted = false;
  loading = false;

  constructor(
    private torreServicesService: TorreServicesService,
    private sweetAlertService: SweetAlertService,
    private dataService: DataService,
    private spinner: NgxSpinnerService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onSubmit(tab: string) {
    this.isSubmitted = true;

    if (tab === 'username') {
      this.getProfile();
    } else {
      this.getOpportunity();
    }
  }

  async getProfile() {
    if (!this.user.valid) {
      return
    }

    try {
      this.spinner.show();
      const request = await this.torreServicesService.getProfile(this.user.value);
      this.spinner.hide();

      this.setProfileData(request);
      
    } catch (error) {
      this.spinner.hide();
      this.sweetAlertService.swalInfo(
        'Usuario no encontrado. Por favor, introduzca un usuario válido.',
        'error'
      );
    }
  }

  setProfileData(profile: any) {
    this.dataService.updatedDataSelection(profile);
    this.router.navigate(['/profile', this.user.value]);
  }

  async getOpportunity() {
    if (!this.opportunity.valid) {
      return
    }

    try {
      this.spinner.show();
      const request = await this.torreServicesService.getOpportunity(this.opportunity.value);
      this.spinner.hide();

      this.setOpportunityData(request);
    } catch (error) {
      this.spinner.hide();
      this.sweetAlertService.swalInfo(
        'Oportunidad no encontrada. Por favor, intente nuevamente.',
        'error'
      );
    }
  }

  setOpportunityData(opportunity: any) {
    this.dataService.updatedDataSelection(opportunity);
    this.router.navigate(['/oportunity', this.opportunity.value]);
  }

}
