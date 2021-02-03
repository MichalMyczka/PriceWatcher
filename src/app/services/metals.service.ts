import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {Metals} from '../models/metals.model';

@Injectable({
  providedIn: 'root'
})
export class MetalsService {

  public metalsBase: string; // TODO base changing

  constructor(private http: HttpClient) { }

  getMetals(): Observable<Metals>{
    this.metalsBase = 'PLN';
    return this.http.get<Metals>(`${environment.metalsApiUrl}/${this.metalsBase}?${environment.bloombergRapidApiKey}`);
  }
}
