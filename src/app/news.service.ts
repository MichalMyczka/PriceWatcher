import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Inews} from './news';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  private url = 'https://bloomberg-market-and-financial-news.p.rapidapi.com/news/list?rapidapi-key=e945b61393msh34694ffb92a9decp1dc310jsn5cb8a620cfa8&id=technology';

  constructor(private http: HttpClient) { }

  getNews(): Observable<Inews[]>{
    return this.http.get<Inews[]>(this.url);
  }

}
