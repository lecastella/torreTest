import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { OpportunityComponent } from './pages/opportunity/opportunity.component';
import { ProfileComponent } from './pages/profile/profile.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'oportunity/:id', component: OpportunityComponent },
  { path: 'profile/:username', component: ProfileComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'home' }
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
