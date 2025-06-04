import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TrainService {
  private stations: string[] = [];

  constructor(private http: HttpClient) {}

  loadStationData(city: string): Promise<void> {
    const filePath = `assets/data/train/${city}-line-stations.json`;
    return this.http.get<any>(filePath).toPromise().then(data => {
      this.stations = data.stations || [];
    });
  }

  getStations(): string[] {
    return this.stations;
  }

findRoute(start: string, end: string): string {
  const startIndex = this.stations.indexOf(start);
  const endIndex = this.stations.indexOf(end);

  if (startIndex === -1 || endIndex === -1) {
    return 'Invalid station selection.';
  }

  let route: string[] = [];

  if (startIndex <= endIndex) {
    route = this.stations.slice(startIndex, endIndex + 1);
  } else {
    route = this.stations.slice(endIndex, startIndex + 1).reverse();
  }

  return `Route: ${route.join(' → ')}`;
}

}
