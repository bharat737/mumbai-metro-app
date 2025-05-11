import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export interface Station {
  name: string;
  lines: string[];
  interchanges: string[];
}

@Injectable({
  providedIn: 'root'
})
export class MetroService {
  constructor(private http: HttpClient) {}

  getStations(): Observable<Station[]> {
    return this.http.get<Station[]>('assets/stations.json');
  }

  

  findRoute(start: string, end: string, stations: Station[]): string[] {
    if (start === end) return [start];
    const route: string[] = [];

    const startStation = stations.find(s => s.name === start);
    const endStation = stations.find(s => s.name === end);
    if (!startStation || !endStation) return [];

    // If on same line
    const sharedLine = startStation.lines.find(line => endStation.lines.includes(line));
    if (sharedLine) return [start, end];

    // Try to find a transfer
    for (const s of stations) {
      if (
        startStation.lines.some(l => s.lines.includes(l)) &&
        endStation.lines.some(l => s.lines.includes(l))
      ) {
        return [start, s.name, end];
      }
    }

    return []; // No path found
  }
}
