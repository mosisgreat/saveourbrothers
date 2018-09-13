import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { SeekersComponent } from './seekers/seekers.component';
import { DashboardComponent }   from './dashboard/dashboard.component';
import { DonorFormComponent }   from './donor-form/donor-form.component';
import { SeekerDetailComponent } from './seeker-detail/seeker-detail.component';
import { AuthenticationComponent } from './authentication/authentication.component';

import { DonationComponent } from './donation/donation.component';

const routes: Routes = [
	{ path: '', redirectTo: '/dashboard', pathMatch: 'full' },
	{ path: 'dashboard', component: DashboardComponent },
	{ path: 'detail/:id', component: SeekerDetailComponent },
	{ path: 'patients', component: SeekersComponent },
	{ path: 'subscribe', component: DonorFormComponent },
	{ path: 'login', component: AuthenticationComponent },
	{ path: 'donation/:id/:patient', component: DonationComponent },
];

@NgModule({
	imports: [ RouterModule.forRoot(routes) ],
	exports: [ RouterModule ]
})
export class AppRoutingModule { }
