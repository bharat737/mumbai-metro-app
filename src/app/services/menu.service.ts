// src/app/shared/menu.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MenuService {
  constructor(private http: HttpClient) {}

  getMainMenu(): Observable<any> {
    return this.http.get('/assets/menu/menu.json');
  }

  getStates(): Observable<string[]> {
    return this.http.get<string[]>('/assets/menu/states.json');
  }

  getCityData(region: string): Observable<any> {
    const file = region.toLowerCase().replace(/\s/g, '-');
    return this.http.get(`/assets/menu/data-${file}.json`);
  }
}
