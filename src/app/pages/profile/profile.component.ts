import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from './../../core/services/data.service';
import { TorreServicesService } from 'src/app/core/services/torre-services.service';
import { SweetAlertService } from 'src/app/core/services/sweet-alert.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {
  subscription = new Subscription();
  username: string;
  profile: any;
  opportunities: any;

  constructor(
    private dataService: DataService,
    private torreServicesService: TorreServicesService,
    private sweetAlertService: SweetAlertService,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getProfileData();
    this.getOpportunities();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getProfileData() {
    this.subscription.add(this.route.params.subscribe((params: Params) => {
      this.username = params['username'];
    }));

    this.subscription.add(this.dataService.data.subscribe(data => {
      if(Object.keys(data).length === 0){
        this.getProfile();
      } else {
        this.profile = data;
      }
    }));
  }

  async getProfile() {
    try {
      this.spinner.show();
      const request = await this.torreServicesService.getProfile(this.username);
      this.profile = request;
      this.spinner.hide();
    } catch (error) {
      this.spinner.hide();
      this.sweetAlertService.swalInfo(
        'Usuario no encontrado. Por favor, introduzca un usuario válido.',
        'error'
      );
    }
  }

  async getOpportunities() {
    try {
      this.spinner.show();
      const request = await this.torreServicesService.getOpportunities();
      this.opportunities = request;
      this.spinner.hide();

    } catch (error) {
      this.spinner.hide();
      this.sweetAlertService.swalInfo(
        'Lo sentimos, hubo un error al obtener información',
        'error'
      );
    }
  }
}
