import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Station {
  name: string;
  interval_from_previous?: number;
  platforms?: {
    to: {
      [destination: string]: number;
    };
  };
}

interface Direction {
  from: string;
  to: string;
  start_time: string;
  frequency_mins: {
    weekday: number;
    saturday: number;
    sunday: number;
    holiday: number;
  };
}

interface MetroLine {
  name: string;
  line_name: string;
  status: 'AC' | 'AP' | 'UC';
  stations: Station[];
  directions?: Direction[];
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
    const file = city === 'mumbai' ? 'platformwise-metro.json' : 'pune-metro.json';
    return this.http.get<any>(`assets/data/metro/${file}`).toPromise().then(data => {
      this.lines = data.lines;
      this.interchanges = data.interchanges || [];
    });
  }

  getAllStations(): string[] {
  const stationSet = new Set<string>();
  this.lines.forEach(line => {
    line.stations.forEach((station: any) => {
      if (typeof station === 'string') {
        stationSet.add(station);
      } else if (station?.name) {
        stationSet.add(station.name);
      }
    });
  });
  return Array.from(stationSet);
}


  getAllLines(): MetroLine[] {
    return this.lines;
  }

  getInterchanges(): Interchange[] {
    return this.interchanges;
  }

  getLines(station: string): string[] {
    return this.lines
      .filter(line => line.stations.some(s => s.name === station))
      .map(line => line.name);
  }

  findRoute(start: string, end: string): string {
    let startLine: MetroLine | undefined;
    let endLine: MetroLine | undefined;

    for (const line of this.lines) {
      const stationNames = line.stations.map(s => s.name);
      if (stationNames.includes(start)) startLine = line;
      if (stationNames.includes(end)) endLine = line;
    }

    if (!startLine || !endLine) return 'No route found between selected stations.';

    if (startLine.name === endLine.name) {
      const stations = startLine.stations.map(s => s.name);
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

    const startStations = startLine.stations.map(s => s.name);
    const endStations = endLine.stations.map(s => s.name);
    const commonStations = startStations.filter(s => endStations.includes(s));

    if (!commonStations.length) return 'No route found between selected stations.';

    const interchange = commonStations[0];
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

  getRouteSegment(from: string, to: string): string[] {
    for (const line of this.lines) {
      const stations = line.stations.map(s => s.name);
      const i1 = stations.indexOf(from);
      const i2 = stations.indexOf(to);
      if (i1 !== -1 && i2 !== -1) {
        const segment = stations.slice(Math.min(i1, i2), Math.max(i1, i2) + 1);
        return i1 > i2 ? segment.reverse() : segment;
      }
    }
    return [];
  }

  getVisualRoute(start: string, end: string): {
    line: string;
    direction: string;
    stations: string[];
    isInterchange?: boolean;
    line_colour: string;
    color: string;
  }[] {
    const result: any[] = [];
    const startLine = this.lines.find(line => line.stations.some(s => s.name === start));
    const endLine = this.lines.find(line => line.stations.some(s => s.name === end));

    if (!startLine || !endLine) return [];

    if (startLine.name === endLine.name) {
      const stations = startLine.stations.map(s => s.name);
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

    const interchange = startLine.stations.find(s => endLine.stations.some(e => e.name === s.name))?.name;
    if (!interchange) return [];

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

  getLineByLineName(lineName: string): MetroLine | undefined {
    return this.lines.find(l => l.line_name === lineName);
  }

  getInterchangeStations(): string[] {
    return this.interchanges.map(i => i.station);
  }

  getLineColor(lineName: string): string {
    const colorMap: { [key: string]: string } = {
      'Blue Line': '#0000FF',
      'Yellow Line': '#FFD700',
      'Yello Line': '#FFA500',
      'Green Line': '#008000',
      'Orange Line': '#FF8C00',
      'Red Line': '#FF0000',
      'Pink Line': '#FF69B4',
      'Aqua Line': '#00FFFF'
    };
    return colorMap[lineName] || '#999';
  }

  // New utility to get start-end route summary for display on click

getAllStationsList(): string[] {
  return Array.from(new Set(this.lines.flatMap(line =>
    line.stations.map((st: any) => typeof st === 'string' ? st : st.name)
  )));
}

getStationsOfLine(lineName: string): string[] {
  const line = this.lines.find(l => l.line_name === lineName);
  if (!line) return [];

  return line.stations.map((st: any) => typeof st === 'string' ? st : st.name);
}

getDirectionsOfLine(lineName: string): { from: string; to: string }[] {
  const line = this.lines.find(l => l.line_name === lineName);
  return (line as any)?.directions?.map((d: any) => ({ from: d.from, to: d.to })) || [];
}

getAllLineNames(): string[] {
  return this.lines.map(line => line.line_name);
}

getTimingsForRoute(lineName: string, from: string, to: string, day: 'weekday' | 'saturday' | 'sunday' | 'holiday'): { start_time: string, frequency_mins: number } | undefined {
  const line = this.lines.find(l => l.line_name === lineName) as any;
  const direction = line?.directions?.find((d: any) => d.from === from && d.to === to);

  if (!direction) return undefined;

  return {
    start_time: direction.start_time,
    frequency_mins: direction.frequency_mins[day]
  };
}

calculateArrivalTimes(lineName: string, from: string, to: string, day: 'weekday' | 'saturday' | 'sunday' | 'holiday'): { station: string; arrival: string; platform: number }[] {
  const line = this.lines.find(l => l.line_name === lineName) as any;
  if (!line) return [];

  const direction = line.directions?.find((d: any) => d.from === from && d.to === to);
  if (!direction) return [];

  const timeParts = direction.start_time.split(':').map(Number);
  let minutesSinceMidnight = timeParts[0] * 60 + timeParts[1];

  const allStations = line.stations as any[];

  const fromIndex = allStations.findIndex(s => s.name === from);
  const toIndex = allStations.findIndex(s => s.name === to);

  const directionStations = fromIndex < toIndex
    ? allStations.slice(fromIndex, toIndex + 1)
    : allStations.slice(toIndex, fromIndex + 1).reverse();

  let result = [];
  for (const station of directionStations) {
    const hours = Math.floor(minutesSinceMidnight / 60).toString().padStart(2, '0');
    const mins = (minutesSinceMidnight % 60).toString().padStart(2, '0');

    const platform = station.platforms?.to?.[to] ?? 0;
    result.push({ station: station.name, arrival: `${hours}:${mins}`, platform });

    minutesSinceMidnight += station.interval_from_previous || 0;
  }

  return result;
}

getRouteSummary(lineName: string, from: string, to: string, day: 'weekday' | 'saturday' | 'sunday' | 'holiday') {
  const line = this.lines.find(l => l.line_name === lineName) as any;
  if (!line) return undefined;

  const direction = line.directions?.find((d: any) => d.from === from && d.to === to);
  if (!direction) return undefined;

  const startStation = line.stations.find((s: any) => s.name === from);
  const platform = startStation?.platforms?.to?.[to] ?? 0;

  return {
    from,
    to,
    start_time: direction.start_time,
    platform
  };
}
getLineByStations(from: string, to: string): any {
  return this.lines.find(line =>
    (line.stations as any[]).some((s: any) => s.name === from) &&
    (line.stations as any[]).some((s: any) => s.name === to)
  );
}

generateTimingsForDirection(startTime: string, frequency: number, endTime: string = '23:30'): string[] {
  const result: string[] = [];
  
  const [startH, startM] = startTime.split(':').map(Number);
  const [endH, endM] = endTime.split(':').map(Number);

  let currentMinutes = startH * 60 + startM;
  const endMinutes = endH * 60 + endM;

  while (currentMinutes <= endMinutes) {
    const hh = Math.floor(currentMinutes / 60).toString().padStart(2, '0');
    const mm = (currentMinutes % 60).toString().padStart(2, '0');
    result.push(`${hh}:${mm}`);
    currentMinutes += frequency;
  }

  return result;
}

}
