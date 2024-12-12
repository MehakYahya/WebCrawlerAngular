import { Component } from '@angular/core';
import { BbcCrawlerComponent } from './bbc-crawler/bbc-crawler.component';

@Component({
  selector: 'app-root',
  standalone: true,  // Ensures the component can work on its own
  imports: [BbcCrawlerComponent],
  templateUrl: './app.component.html',

})
export class AppComponent {

}
