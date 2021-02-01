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
  }

  // setNewsData(newsList): void{
  //   let title = this.newsList.modules.0.stories.0.title;
  // }

}
