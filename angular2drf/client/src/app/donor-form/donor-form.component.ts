import { Component, OnInit, TemplateRef } from '@angular/core';
import { DonorService } from '../services/donor.service';
import { Router } from '@angular/router';
import { Donor } from '../donor';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { FormBuilder, Validators } from '@angular/forms';

import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-donor-form',
  templateUrl: './donor-form.component.html',
  styleUrls: ['./donor-form.component.css']
})
export class DonorFormComponent implements OnInit {

	error: string;
	model: any = {};

	modalRef: BsModalRef;
	message: string;

	// constructing the donor's form // first_name: [''], last_name: [''],
	donorForm = this.fb.group({
		
		user: this.fb.group({
			username: ['', Validators.required],
			email: [''],
			password: ['']
		}),
		phone: [''],
	});

	onSubmit() {
		if (this.donorForm.valid) {
			this.donorService.addDonor(this.donorForm.value as Donor)
	    		.subscribe( 
    				data => {
		    			// this.router.navigate(['/dashboard']);
		    			console.log(data);
		    			// data contains the message error returned from handler
		    			if (typeof data === 'string') {
		    				this.error = data;
		    			}
	  				}
		  		);
		} else {
			console.log('invalid form');
			//this.validateAllFormFields(this.form); 
		}
		
	  	console.warn(this.donorForm.value);
	}

	constructor(
		private fb: FormBuilder,
		private donorService: DonorService, 
		private router: Router, 
		private modalService: BsModalService
	) { }

	ngOnInit() {}


  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  confirm(): void {
    this.message = 'Confirmed!';
    this.modalRef.hide();
    console.log(this.message);
  }
 
  decline(): void {
    this.message = 'Declined!';
    console.log(this.message);
    this.modalRef.hide();
  }

  // TODO: Remove this when we're done 
  get diagnostic() { return JSON.stringify(this.donorForm.value); }

}









/*
  onSubmit() {
  	this.donorService.addDonor(this.model as Donor)
	    .subscribe(donor => {
	    	this.router.navigate(['/PublicPage']);
	    	//console.log(donor);
	  });
  }

onSubmit(model) {
    if (model.valid === true) {
        this.SharedService.postFormdata(model).subscribe(
            data => {
                console.log(data);
                this.router.navigate(['PublicPage']); // ON SUCCESS
            },
            error => Observable.throw(error),
            () => {
                    this.router.navigate(['PublicPage']); //ANYHOW WILL CALL
                }
        );
    }
}

this.donorService.addDonor(this.model as Donor)
  .subscribe(_ => {
	this.router.navigate(['/dashboard']);
	//console.log(donor);
});


*/