import { Component, OnInit, TemplateRef } from '@angular/core';
import { SeekerService } from '../services/seekers.service';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { Seeker } from '../seeker';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
	
	patients: Seeker[];  // urgent patients
	
	constructor(private seekerService: SeekerService) { }  

	getUrgentSeekers() {
		this.seekerService
			.getUrgentSeekers()
			.subscribe(patients => this.patients = patients.slice(0, 2))
	}

	calculatePercent (patient: Seeker){
		return Math.round(100*patient.raised_amount/patient.target_amount);
	}

	// used to get the wysiwyg description content
	getDescription (patient: Seeker){
		console.log(patient.description.slice(2, 500));
		return patient.description;
	}

	ngOnInit() {
		this.getUrgentSeekers();
		registerLocaleData(localeFr, 'fr');
	}


}
