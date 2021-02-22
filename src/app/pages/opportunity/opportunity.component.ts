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
  matches = { compensations: [], skills: [], locations: [] };
  cardOpp = 'general';

  constructor(
    private dataService: DataService,
    private torreServicesService: TorreServicesService,
    private sweetAlertService: SweetAlertService,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute
  ) { }

  async ngOnInit() {
    await this.getOpportunityData();
    await this.getPeople();
    this.searchMatches();
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
      console.log(this.opportunity);
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

  searchMatches() {
    // Compensations
    this.people['results'].map(people => {
      if (Object.keys(people.compensations).length !== 0) {
        if (people.compensations.employee) {
          if (people.compensations.employee.periodicity === this.opportunity.compensation.periodicity) {
            if (this.opportunity.compensation.minAmount <= people.compensations.employee.amount) {
              this.matches['compensations'].push(people);
            }
          }
        }

        if (people.compensations.freelancer) {
          if (people.compensations.freelancer.periodicity === this.opportunity.compensation.periodicity) {
            if (this.opportunity.compensation.minAmount <= people.compensations.freelancer.amount) {
              this.matches['compensations'].push(people);
            }
          }
        }
      }
    })

    // Skills
    this.people['results'].map(people => {
      if (Object.keys(people.skills).length !== 0) {
        people.skills.map(skill => {
          this.opportunity.strengths.map(strength => {
            if (strength.name === skill.name) {
              this.matches['skills'].push(people);
            }
          })
        })
      }
    })

    // Locations
    this.people['results'].map(people => {
      if (Object.keys(this.opportunity.place.location).length !== 0) {
        this.opportunity.place.location.map(location => {
          if (people.locationName === location.id) {
            this.matches['locations'].push(people);
          }
        })
      }
    })
  }
}
