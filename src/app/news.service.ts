import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse, HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  private baseUrl = 'https://api.exchangeratesapi.io/latest';
  constructor(private http: HttpClient) { }

  getNews(): Observable<any> {
    return this.http.get();
  }
}
