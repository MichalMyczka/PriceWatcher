import { Component, OnInit } from '@angular/core';
import { NewsService } from '../../services/news.service';
import {News} from '../../models/news.model';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  public newsList: News;

  constructor(private news: NewsService) { }

  ngOnInit(): void {
    this.getNews();
  }

  getNews(): void{
    this.news.getNews()
      .subscribe(data => this.newsList = data);
  }

}
