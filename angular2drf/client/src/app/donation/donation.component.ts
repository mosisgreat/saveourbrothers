import { Component, OnInit, Input } from '@angular/core';
import { SeekerService } from '../services/seekers.service'; 
import { ActivatedRoute } from '@angular/router';
import { Seeker } from '../seeker';
import { UserService } from '../services/user.service';
import localeFr from '@angular/common/locales/fr';
import { registerLocaleData } from '@angular/common';

@Component({
  selector: 'app-donation',
  templateUrl: './donation.component.html',
  styleUrls: ['./donation.component.css']
})
export class DonationComponent implements OnInit {

	@Input() seeker: Seeker;
	token: any;
	public user: any;

	min: number = 500;
	max: number = 1000000;

	patient_amount: number = 1000;
	organism_amount: number = 500;
	total_amount: number;

	constructor(
		private route: ActivatedRoute, 
		private seekerService: SeekerService,
		private _userService: UserService,
	) { }

	ngOnInit() {
	    this.user = {
	      username: '',
	      password: ''
	    };
		this.getSeeker();
		this.getLoggedDonor();
		this.updateTotalDonation();
		registerLocaleData(localeFr, 'fr');
	}

	getLoggedDonor(): void {
		this.token = '';
		if (typeof this._userService.token !== 'undefined') {
			this.token = this._userService.token;
			let token_parts = this.token.split(/\./);
			let token_decoded = JSON.parse(window.atob(token_parts[1]));
//			console.log('in donation: '+ this.token);
			console.log(token_decoded);
		}
	}

	// increase donated amount
	increasePatientAmount() {
		this.patient_amount++;
		this.updateTotalDonation();
	}

	// decrease donated amount
	decreasePatientAmount() {
		this.patient_amount--;
		this.updateTotalDonation();
	}s

	increaseOrganismAmount() {
		this.organism_amount++;
		this.updateTotalDonation();
	}

	decreaseOrganismAmount() {
		this.organism_amount--;
		this.updateTotalDonation();
	}

	updateTotalDonation(){
		this.total_amount=(+this.patient_amount)+(+this.organism_amount);
	}

	updateChangedDonation(amount: number,source: number){
		
		if (source == 0) { this.patient_amount=amount; }
		if (source == 1) { this.organism_amount=amount; }

		this.total_amount=(+this.patient_amount)+(+this.organism_amount);
		//console.log("source:"+source +" amount: "+amount +" Total: "+this.total_amount+ " Patient:"+this.patient_amount +" Organism:" +this.organism_amount);
	}

	getSeeker(): void {
		const id = +this.route.snapshot.paramMap.get('id');
		this.seekerService.getSeeker(id)
		.subscribe(seeker => this.seeker = seeker);
	}

	numberOnly(event): boolean {
		const charCode = (event.which) ? event.which : event.keyCode;
		if (charCode > 31 && (charCode < 48 || charCode > 57)) {
		  return false;
		}
		return true;
	}

	// used to get the wysiwyg description content
	getDescription (patient: Seeker){
		return patient.description;
	}

	login() {
		this._userService.login({'username': this.user.username, 'password': this.user.password});
		console.log({'username': this.user.username, 'password': this.user.password});
	}

	refreshToken() {
		this._userService.refreshToken();
		this.updateTotalDonation();
	}

	logout() {
		this._userService.logout();
		this.updateTotalDonation();
	}

}
