import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { Donor } from '../donor';

import { catchError, map, tap } from 'rxjs/operators';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class DonorService {

	private apiURL = 'http://localhost:8000/api/donors/';

	/** POST: add a new Donor to the server */
	addDonor (donor: Donor): Observable<Donor> {
	  return this.http.post<Donor>(this.apiURL, donor, httpOptions)
      .pipe(
	       tap((donor: Donor) => console.log(`added donor w/ username=${donor.user.username}`)),
	       catchError(this.handleError<Donor>('addHero'))
	     );
	}

  constructor (private http: HttpClient) { }

  /**
     * Handle Http operation that failed.
     * Let the app continue.
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
    private handleError<T> (operation = 'operation', result?: T) {
      return (error: any): Observable<T> => {
     
        // TODO: better job of transforming error for user consumption
        if (error.status == 400) {
          console.error('Backend returned status code: ', error.status);
          console.error('User Exists: ', error.error['user']['username'][0]);
          console.log(`${operation} failed: ${error.message}`);
          result = error.error['user']['username'][0];
        }

        // TODO: send the error to remote logging infrastructure
        console.error(error); // log to console instead
        
        // Let the app keep running by returning an empty result.
        return of(result as T);
      };
    }
}
