import { Component, OnInit } from '@angular/core';
import { SeekerService } from '../services/seekers.service';
import { Seeker } from '../seeker';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';

@Component({
  selector: 'app-seekers',
  templateUrl: './seekers.component.html',
  styleUrls: ['./seekers.component.css']
})
export class SeekersComponent implements OnInit {

	seekers: Seeker[];
	returnedArray: Seeker[];
	size: number;
	error: any;

	constructor(private seekerService: SeekerService) { }  

	getSeekers() {
		this.seekerService
			.getSeekers()
			.subscribe(
				seekers => { 
					this.seekers = seekers; 
					this.returnedArray = this.seekers.slice(0, 1);
					this.size = this.seekers.length;
				}
			);
	}

	calculatePercent (patient: Seeker){
		return Math.round(100*patient.raised_amount/patient.target_amount);
	}

	ngOnInit() {
		this.getSeekers();
		//this.returnedArray = this.seekers.slice(0, 1);
	}

	pageChanged(event: PageChangedEvent): void {
		const startItem = (event.page - 1) * event.itemsPerPage;
		const endItem = event.page * event.itemsPerPage;
		this.returnedArray = this.seekers.slice(startItem, endItem);
	}

}
