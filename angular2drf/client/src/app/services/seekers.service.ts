import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

//import 'rxjs/add/operator/toPromise';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Seeker } from '../seeker';

@Injectable({ providedIn: 'root' })
export class SeekerService {
//  private apiURL = 'http://localhost:8000/api/seekers/?format=json';
  private apiURL = 'http://localhost:8000/api/seekers';

  constructor(private http: HttpClient) { }

  	// All seekers
	getSeekers (): Observable <any> {
	  return this.http.get(this.apiURL)
	    .pipe(
			tap(heroes => console.log(`fetched heroes`)),
	      	catchError(this.handleError('getSeekers', []))
	    );
	}

	// urgent seekers
	getUrgentSeekers(): Observable <Seeker[]> {
	  return this.http.get <Seeker[]>(this.apiURL)
	    .pipe(
	      tap(seekers => console.log(seekers)),
	      catchError(this.handleError('getSeekers', []))
	    );
	}

	/* Get hero by id. Will 404 if id not found */
	getSeeker(id: number): Observable <Seeker> {
		const url = `${this.apiURL}/${id}`;
		return this.http.get<Seeker>(url).pipe(
			tap(_ => console.log(`fetched seeker id=${id}`)),
			catchError(this.handleError<Seeker>(`getSeeker id=${id}`))
		);
	}

	private handleError<T> (operation = 'operation', result?: T) {
	  return (error: any): Observable<T> => {
	 
	    // TODO: send the error to remote logging infrastructure
	    console.error(error); // log to console instead
	 
	    // TODO: better job of transforming error for user consumption
		// this.log(`${operation} failed: ${error.message}`);
	 
	    // Let the app keep running by returning an empty result.
	    return of(result as T);
	  };
	}

}




/*
	getSeekers() {
		return this.http.get(this.apiURL)
		          .toPromise()
		          .then(response => response.json())
		          .catch(this.handleError);
	}  

	private handleError(error: any) {
		console.error('An error occurred', error);
		return Promise.reject(error.message || error);
	}

*/