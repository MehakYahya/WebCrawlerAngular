import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class BbcScraperService {
  // Point to your backend server's scrape endpoint
  private apiUrl = 'http://localhost:3000/scrape-bbc';

  constructor(private http: HttpClient) {}

  // Method to get title and description from BBC via your server
  getBbcTitleAndDescription(): Observable<{ title: string, description: string }> {
    return this.http.get<{ title: string, description: string }>(this.apiUrl)
      .pipe(
        catchError(error => {
          console.error('Error fetching data from server:', error);
          throw error;  
        })
      );
  }

}
