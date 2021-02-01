import { Component, OnInit } from '@angular/core';
import { NewsService } from '../news.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  public newsList = [];

  constructor(private news: NewsService) { }

  ngOnInit(): void {
    this.news.getNews()
      .subscribe(data => this.newsList = data); //wyjaśnić
    this.setNewsData(this.newsList);
  }

  setNewsData(newsList): any[]{
    const title = this.newsList;
    return title;
  }
}
