import { Component } from '@angular/core';
import { BbcScraperService } from '../bbc-scraper.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { NgIf, NgForOf } from '@angular/common';

@Component({
  selector: 'app-bbc-crawler',
  templateUrl: './bbc-crawler.component.html',
  styleUrls: ['./bbc-crawler.component.css'],
  imports: [NgIf, NgForOf]
})
export class BbcCrawlerComponent {
  titlesAndDescriptions: { title: string, description: string, imageUrl: string }[] = [];
  errorMessage: string | null = null;
  isLoading = false;  // Declare the isLoading variable

  constructor(private scraperService: BbcScraperService) {}

  crawlWebsite(): void {
    this.isLoading = true;

    this.scraperService.getBbcTitleAndDescription()
      .pipe(
        catchError(error => {
          console.error('Error:', error);
          this.errorMessage = 'Failed to fetch BBC content or server is unavailable.';
          this.isLoading = false;
          return of([]);
        })
      )
      .subscribe(data => {
        console.log('Fetched data:', data);
        if (Array.isArray(data) && data.length > 0) {
          this.titlesAndDescriptions = data;  // Store fetched data
          this.errorMessage = null;  // Clear error
        } else {
          this.titlesAndDescriptions = [];
          this.errorMessage = 'No content found.';
        }
        this.isLoading = false;
      });
  }
}
