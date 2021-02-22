import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from './../../core/services/data.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {
  subscription = new Subscription();
  profile: any;
  cardType = 'perfil'

  constructor(
    private dataService: DataService
  ) { }

  ngOnInit(): void {
    this.getProfileData();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getProfileData() {
    this.subscription.add(this.dataService.data.subscribe(data => {
      this.profile = data;
      console.log(this.profile)
    }));
  }

}
