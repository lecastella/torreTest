import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/core/services/data.service';
import { SweetAlertService } from 'src/app/core/services/sweet-alert.service';
import { TorreServicesService } from 'src/app/core/services/torre-services.service';

@Component({
  selector: 'app-opportunity',
  templateUrl: './opportunity.component.html',
  styleUrls: ['./opportunity.component.css']
})
export class OpportunityComponent implements OnInit, OnDestroy {
  subscription = new Subscription();
  idOpportunity: string;
  opportunity: any;
  people: any;

  constructor(
    private dataService: DataService,
    private torreServicesService: TorreServicesService,
    private sweetAlertService: SweetAlertService,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getOpportunityData();
    this.getPeople();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getOpportunityData() {
    this.subscription.add(this.route.params.subscribe((params: Params) => {
      this.idOpportunity = params['id'];
    }));

    this.subscription.add(this.dataService.data.subscribe(data => {
      if(Object.keys(data).length === 0){
        this.getOpportunity();
      } else {
        this.opportunity = data;
      }
    }));
  }

  async getOpportunity() {
    try {
      this.spinner.show();
      const request = await this.torreServicesService.getOpportunity(this.idOpportunity);
      this.opportunity = request;
      this.spinner.hide();

    } catch (error) {
      this.spinner.hide();
      this.sweetAlertService.swalInfo(
        'Oportunidad no encontrada. Por favor, intente nuevamente.',
        'error'
      );
    }
  }

  async getPeople() {
    try {
      this.spinner.show();
      const request = await this.torreServicesService.getPeople();
      this.people = request;
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
