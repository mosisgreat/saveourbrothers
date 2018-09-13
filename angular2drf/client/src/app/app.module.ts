// https://valor-software.com/ngx-bootstrap/#/pagination#content-switching

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule }   from '@angular/forms';

import { AppComponent } from './app.component';
import { HttpClientModule }    from '@angular/common/http';
import { DonorFormComponent } from './donor-form/donor-form.component';
import { AppRoutingModule } from './app-routing.module';
import { SeekersComponent } from './seekers/seekers.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { ProgressBarModule } from "angular-progress-bar";
import { SeekerDetailComponent } from './seeker-detail/seeker-detail.component';

import { ModalModule } from 'ngx-bootstrap/modal';
import { AlertModule } from 'ngx-bootstrap/alert';
import { DonationComponent } from './donation/donation.component';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { AuthenticationComponent } from './authentication/authentication.component';

@NgModule({
  declarations: [
    AppComponent,
    DonorFormComponent,
    SeekersComponent,
    DashboardComponent,
    SeekerDetailComponent,
    DonationComponent,
    AuthenticationComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    ModalModule.forRoot(), // modal module
    AlertModule.forRoot(), // alert module
    PaginationModule.forRoot(), // pagination modulex
    ProgressBarModule // progressbar dowloaded
  ],
  providers: [],
  bootstrap: [AppComponent],
//  entryComponents: [ModalComponent] // added by mosis for modal
})
export class AppModule { }
