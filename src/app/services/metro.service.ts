import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface MetroLine {
  name: string;
  stations: string[];
}

interface Interchange {
  station: string;
  lines: string[];
}

@Injectable({ providedIn: 'root' })
export class MetroService {
  private lines: MetroLine[] = [];
  private interchanges: Interchange[] = [];

  constructor(private http: HttpClient) {}

  loadCityData(city: string): Promise<void> {
    const file = city === 'mumbai' ? 'mumbai-metro.json' : 'pune-metro.json';
    return this.http.get<any>(`assets/${file}`).toPromise().then(data => {
      this.lines = data.lines;
      this.interchanges = data.interchanges;
    });
  }

  getAllStations(): string[] {
    return Array.from(new Set(this.lines.flatMap(line => line.stations)));
  }

  findDirectRoute(start: string, end: string): string {
    for (const line of this.lines) {
      const startIdx = line.stations.indexOf(start);
      const endIdx = line.stations.indexOf(end);
      if (startIdx !== -1 && endIdx !== -1) {
        const route = line.stations.slice(Math.min(startIdx, endIdx), Math.max(startIdx, endIdx) + 1);
        const time = route.length * 3;
        return `1: From ${start} to ${end} via ${line.name} Line:\n\t${route.join(' -> ')} (Time: ${time} minutes)\n`;
      }
    }
    return '';
  }

  findTransferRoutes(start: string, end: string, count: number = 1): string {
    let output = '';
    for (const interchange of this.interchanges) {
      if (
        this.getLines(start).some(line => interchange.lines.includes(line)) &&
        this.getLines(end).some(line => interchange.lines.includes(line))
      ) {
        const toInterchange = this.getRoute(start, interchange.station);
        const fromInterchange = this.getRoute(interchange.station, end);
        if (!toInterchange.length || !fromInterchange.length) continue;

        const joined = [...toInterchange, ...fromInterchange];
        const endIndex = joined.indexOf(end);
        const route = [...new Set(joined.slice(0, endIndex + 1))];
        const time = route.length * 3;
        const linesUsed = interchange.lines.map(l => l.replace(/ Line$/, '')).join(' and ');

        output += `${count++}: From ${start} to ${end} using transfer at ${interchange.station}:\n`;
        output += `\tStep 1: Go from ${start} to ${interchange.station}\n`;
        output += `\tStep 2: Change to ${linesUsed} at ${interchange.station}\n`;
        output += `\tStep 3: Continue to ${end}\n`;
        output += `\tRoute: ${route.join(' -> ')} (Time: ${time} minutes)\n\n`;
      }
    }
    return output || 'No transfer route found.';
  }

  private getRoute(from: string, to: string): string[] {
    for (const line of this.lines) {
      const startIdx = line.stations.indexOf(from);
      const endIdx = line.stations.indexOf(to);
      if (startIdx !== -1 && endIdx !== -1) {
        return line.stations.slice(Math.min(startIdx, endIdx), Math.max(startIdx, endIdx) + 1);
      }
    }
    return [];
  }

  private getLines(station: string): string[] {
    return this.lines.filter(line => line.stations.includes(station)).map(line => line.name);
  }
}
