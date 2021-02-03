import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {News} from '../models/news.model';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private http: HttpClient) { }

  getNews(): Observable<News>{
    return this.http.get<News>(`${environment.bloombergApiUrl}/news/list?${environment.bloombergRapidApiKey}&id=markets`);
  }

}
