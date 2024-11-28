import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';  // To provide HttpClient
import { AppComponent } from './app/app.component';  // Your main component
import { BbcScraperService } from './app/bbc-scraper.service';  // Import your service

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),  // Provide HttpClient in the standalone way
    BbcScraperService  // Provide your scraper service
  ]
})
  .catch((err: unknown) => console.error(err));
