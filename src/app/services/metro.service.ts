import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface MetroLine {
  name: string;
  line_name: string;
  status: 'AC' | 'AP';
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
    return this.http.get<any>(`assets/data/metro/${file}`).toPromise().then(data => {
      this.lines = data.lines;
      this.interchanges = data.interchanges;
    });
  }

  getAllStations(): string[] {
    return Array.from(new Set(this.lines.flatMap(line => line.stations)));
  }

  getAllLines(): MetroLine[] {
    return this.lines;
  }

  findRoute(start: string, end: string): string {
    const visitedStations: Set<string> = new Set();
    let output = '';
    let count = 1;

    // Check if start and end are on the same line
    for (const line of this.lines) {
      const startIdx = line.stations.indexOf(start);
      const endIdx = line.stations.indexOf(end);
      if (startIdx !== -1 && endIdx !== -1) {
        const route = line.stations.slice(Math.min(startIdx, endIdx), Math.max(startIdx, endIdx) + 1);
        const time = this.calculateTime(route.length);
        return `${count++}: From ${start} to ${end} via ${line.name}:
\t${route.join(' -> ')} (Time: ${time})\n`;
      }
    }

    // Only check transfers if not on same line
    const transferRoutes = this.getTransferRoutes(start, end, visitedStations);
    for (const route of transferRoutes) {
      output += `${count++}: From ${start} to ${end} using transfer at ${route.interchange}:
`;
      output += `\tStep 1: Go from ${start} to ${route.interchange}\n`;
      output += `\tStep 2: Change to ${route.lines.join(' and ')} at ${route.interchange}\n`;
      output += `\tStep 3: Continue to ${end}\n`;
      output += `\tRoute: ${route.path.join(' -> ')} (Time: ${this.calculateTime(route.path.length)})\n\n`;
    }

    return output.trim() || 'No route found between selected stations.';
  }

  getLines(station: string): string[] {
    return this.lines
      .filter((line: MetroLine) => line.stations.includes(station))
      .map((line: MetroLine) => line.name);
  }

  calculateTime(stops: number): string {
    const timeInMinutes = stops * 3;
    return `${timeInMinutes} minutes`;
  }

  removeDuplicateStations(route: string[]): string[] {
    const seen = new Set();
    return route.filter(station => {
      if (seen.has(station)) return false;
      seen.add(station);
      return true;
    });
  }

  getTransferRoutes(start: string, end: string, visited: Set<string>) {
    const transferPaths: any[] = [];

    for (const interchange of this.interchanges) {
      const inter = interchange.station;

      if (inter === start || inter === end) continue;

      const pathTo = this.getRouteSegment(start, inter);
      const pathFrom = this.getRouteSegment(inter, end);

      if (pathTo.length && pathFrom.length) {
        const combined = [...pathTo, ...pathFrom.slice(1)];
        const uniquePath = this.removeDuplicateStations(combined);

        const allLines = new Set([
          ...this.getLines(start).filter(l => interchange.lines.includes(l)),
          ...this.getLines(end).filter(l => interchange.lines.includes(l))
        ]);

        if (uniquePath.length > 1 && allLines.size) {
          transferPaths.push({
            interchange: inter,
            path: uniquePath,
            lines: Array.from(allLines)
          });
        }
      }
    }

    return transferPaths;
  }

  getRouteSegment(from: string, to: string): string[] {
    for (const line of this.lines) {
      const i1 = line.stations.indexOf(from);
      const i2 = line.stations.indexOf(to);
      if (i1 !== -1 && i2 !== -1) {
        const segment = line.stations.slice(Math.min(i1, i2), Math.max(i1, i2) + 1);
        return i1 > i2 ? segment.reverse() : segment;
      }
    }
    return [];
  }
}
