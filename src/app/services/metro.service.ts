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

  getInterchanges(): any[] {
    return this.interchanges;
  }

  findRoute(start: string, end: string): string {
    const pathSegments: { line: string; direction: string; stations: string[] }[] = [];

    let foundStart = null;
    let foundEnd = null;
    let startLine = null;
    let endLine = null;

    for (const line of this.lines) {
      const stationNames = line.stations;
      if (stationNames.includes(start)) {
        foundStart = stationNames;
        startLine = line;
      }
      if (stationNames.includes(end)) {
        foundEnd = stationNames;
        endLine = line;
      }
    }

    if (!startLine || !endLine) return 'No route found between selected stations.';

    // Same line
    if (startLine.name === endLine.name) {
      const stations = startLine.stations;
      const startIndex = stations.indexOf(start);
      const endIndex = stations.indexOf(end);
      const segmentStations =
        startIndex < endIndex
          ? stations.slice(startIndex, endIndex + 1)
          : stations.slice(endIndex, startIndex + 1).reverse();

      return `Trip starts ☞\n${startLine.name} Platform 0 Towards ${segmentStations[segmentStations.length - 1]}\n` +
        segmentStations.map(s => `◉ ${s}`).join('\n') +
        `\nTrip ends 🙏`;
    }

    // Interchange route
    const commonStations = startLine.stations.filter(s => endLine!.stations.includes(s));

    if (commonStations.length === 0) return 'No route found between selected stations.';

    const interchange = commonStations[0];
    const startStations = startLine.stations;
    const endStations = endLine.stations;

    const startIndex = startStations.indexOf(start);
    const interchangeIndexStart = startStations.indexOf(interchange);
    const endIndex = endStations.indexOf(end);
    const interchangeIndexEnd = endStations.indexOf(interchange);

    const segment1 =
      startIndex < interchangeIndexStart
        ? startStations.slice(startIndex, interchangeIndexStart + 1)
        : startStations.slice(interchangeIndexStart, startIndex + 1).reverse();

    const segment2 =
      interchangeIndexEnd < endIndex
        ? endStations.slice(interchangeIndexEnd, endIndex + 1)
        : endStations.slice(endIndex, interchangeIndexEnd + 1).reverse();

    return `Trip starts ☞\n${startLine.name} Platform 0 Towards ${segment1[segment1.length - 1]}\n` +
      segment1.map(s => `◉ ${s}`).join('\n') +
      `\nChange here ☞\n${endLine.name} Platform 0 Towards ${segment2[segment2.length - 1]}\n` +
      segment2.map(s => `◉ ${s}`).join('\n') +
      `\nTrip ends 🙏`;
  }

  getVisualRoute(start: string, end: string): {
  line: string;
  direction: string;
  stations: string[];
  isInterchange?: boolean;
}[] {
  let result: {
    line: string;
    direction: string;
    stations: string[];
    isInterchange?: boolean;
    line_colour: string;
    color: string;
  }[] = [];

  const startLine = this.lines.find(line => line.stations.includes(start));
  const endLine = this.lines.find(line => line.stations.includes(end));

  if (!startLine || !endLine) return [];

  // Case 1: Both on same line
  if (startLine.name === endLine.name) {
    const stations = startLine.stations;
    const startIndex = stations.indexOf(start);
    const endIndex = stations.indexOf(end);
    const segmentStations =
      startIndex < endIndex
        ? stations.slice(startIndex, endIndex + 1)
        : stations.slice(endIndex, startIndex + 1).reverse();

    result.push({
      line: startLine.name,
      direction: segmentStations[segmentStations.length - 1],
      stations: segmentStations,
      line_colour: startLine.line_name,
      color: this.getLineColor(startLine.line_name)
    });
    return result;
  }

  // Case 2: With Interchange
  const commonStations = startLine.stations.filter(st => endLine.stations.includes(st));
  if (!commonStations.length) return [];

  const interchange = commonStations[0]; // first match
  const segment1 = this.getRouteSegment(start, interchange);
  const segment2 = this.getRouteSegment(interchange, end);

  result.push({
    line: startLine.name,
    direction: segment1[segment1.length - 1],
    stations: segment1,
    line_colour: startLine.line_name,
    color: this.getLineColor(startLine.line_name)
  });

  result.push({
    line: endLine.name,
    direction: segment2[segment2.length - 1],
    stations: segment2,
    isInterchange: true,
    line_colour: endLine.line_name,
    color: this.getLineColor(endLine.line_name)
  });

  return result;
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

  getLineByLineName(lineName: string): any {
    return this.lines.find(l => l.line_name === lineName);
  }

  getInterchangeStations(): string[] {
    return this.interchanges.map(i => i.station);
  }

  getLineColor(lineName: string): string {
    const colorMap: { [key: string]: string } = {
      'Blue Line': '#0000FF',
      'Yello Line': '#FFA500',
      'Yellow Line': '#FFD700',
      'Green Line': '#008000',
      'Orange Line': '#FF8C00',
      'Red Line': '#FF0000',
      'Pink Line': '#FF69B4',
      'Aqua Line': '#00FFFF'
    };
    return colorMap[lineName] || '#999'; // default gray if unknown
  }
}
