import { Component, OnInit, Input } from '@angular/core';
import { SeekerService } from '../services/seekers.service'; 
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Seeker } from '../seeker';

@Component({
  selector: 'app-seeker-detail',
  templateUrl: './seeker-detail.component.html',
  styleUrls: ['./seeker-detail.component.css']
})
export class SeekerDetailComponent implements OnInit {
	@Input() seeker: Seeker;
	
	constructor(
		private seekerService: SeekerService,
	    private route: ActivatedRoute,
    	private location: Location
	) { }

	ngOnInit(): void {
		this.getSeeker();
	}

	getSeeker(): void {
		const id = +this.route.snapshot.paramMap.get('id');
		this.seekerService.getSeeker(id)
		.subscribe(seeker => this.seeker = seeker);
	}
 
	calculatePercent (patient: Seeker){
		return 100*patient.raised_amount/patient.target_amount;
	}

	goBack(): void {
		this.location.back();
	}
}
