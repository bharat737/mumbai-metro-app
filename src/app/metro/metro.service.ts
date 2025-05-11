import { Injectable } from '@angular/core';
import stationsData from '../../assets/metro-data.json';

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
  private lines: MetroLine[] = (stationsData as any).lines;
  private interchanges: Interchange[] = (stationsData as any).interchanges;

  getAllStations(): string[] {
    const allStations = this.lines.flatMap((line: MetroLine) => line.stations);
    return Array.from(new Set(allStations));
  }

  findDirectRoute(start: string, end: string): string {
    for (const line of this.lines) {
      const startIdx = line.stations.indexOf(start);
      const endIdx = line.stations.indexOf(end);
      if (startIdx !== -1 && endIdx !== -1) {
        const route = line.stations.slice(
          Math.min(startIdx, endIdx),
          Math.max(startIdx, endIdx) + 1
        );
        const time = this.calculateTime(route.length);
        return `1: From ${start} to ${end} via ${line.name} Line:\n\t${route.join(' -> ')} (Time: ${time})\n`;
      }
    }
    return '';
  }

  findTransferRoutes(start: string, end: string): string {
    const visitedStations: Set<string> = new Set();
    let output = '';

    for (const interchange of this.interchanges) {
      if (
        this.getLines(start).some((line) => interchange.lines.includes(line)) &&
        this.getLines(end).some((line) => interchange.lines.includes(line))
      ) {
        const routeToInterchange = this.getRouteWithInterchange(start, interchange.station, visitedStations);
        const routeFromInterchange = this.getRouteWithInterchange(interchange.station, end, visitedStations);

        if (
          routeToInterchange.length === 0 ||
          routeFromInterchange.length === 0 ||
          routeToInterchange.includes(end) ||
          routeToInterchange[routeToInterchange.length - 1] === routeFromInterchange[0]
        ) {
          continue;
        }

        const combinedRoute = [...routeToInterchange, ...routeFromInterchange];
        const endIdx = combinedRoute.indexOf(end);
        const uniqueRoute = this.removeDuplicateStations(combinedRoute.slice(0, endIdx + 1));
        const time = this.calculateTime(uniqueRoute.length);
        const cleanedLineNames = interchange.lines.map(l => l.replace(/ Line$/, '')).join(' and ');

        output += `2: From ${start} to ${end} via ${cleanedLineNames} Line:\n\t${uniqueRoute.join(' -> ')}\n\tChange at ${interchange.station} and take ${cleanedLineNames} Line to ${end}\n\tTotal Time: ${time}\n\n`;
      }
    }

    return output || 'No transfer route found.';
  }

  getLines(station: string): string[] {
    return this.lines.filter((line) => line.stations.includes(station)).map((line) => line.name);
  }

  calculateTime(stops: number): string {
    const timeInMinutes = stops * 3;
    return `${timeInMinutes} minutes`;
  }

  getRouteWithInterchange(start: string, end: string, visitedStations: Set<string>): string[] {
    const routes: string[] = [];
    for (const line of this.lines) {
      const startIdx = line.stations.indexOf(start);
      const endIdx = line.stations.indexOf(end);
      if (startIdx !== -1 && endIdx !== -1) {
        const route = line.stations.slice(
          Math.min(startIdx, endIdx),
          Math.max(startIdx, endIdx) + 1
        );
        routes.push(...route);
      }
    }
    return routes;
  }

  removeDuplicateStations(route: string[]): string[] {
    const seen = new Set();
    return route.filter((station) => {
      if (seen.has(station)) return false;
      seen.add(station);
      return true;
    });
  }
}
