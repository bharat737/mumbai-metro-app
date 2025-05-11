import { Injectable } from '@angular/core';
import stationsData from '../metro/stations.json';

interface Line {
  name: string;
  stations: string[];
}

interface Interchange {
  station: string;
  lines: string[];
}

@Injectable({
  providedIn: 'root'
})
export class MetroService {
  private lines: Line[] = stationsData.lines;
  private interchanges: Interchange[] = stationsData.interchanges;

  private buildGraph(): Map<string, string[]> {
    const graph = new Map<string, string[]>();

    for (const line of this.lines) {
      for (let i = 0; i < line.stations.length; i++) {
        const station = line.stations[i];

        if (!graph.has(station)) graph.set(station, []);

        if (i + 1 < line.stations.length) {
          graph.get(station)!.push(line.stations[i + 1]);
          if (!graph.has(line.stations[i + 1])) graph.set(line.stations[i + 1], []);
          graph.get(line.stations[i + 1])!.push(station);
        }
      }
    }

    return graph;
  }

  private findLinesOfStation(station: string): string[] {
    return this.lines.filter(line => line.stations.includes(station)).map(line => line.name);
  }

  public findPath(start: string, end: string): string[] {
    const graph = this.buildGraph();
    const visited = new Set<string>();
    const queue: [string, string[]][] = [[start, [start]]];

    while (queue.length > 0) {
      const [current, path] = queue.shift()!;
      if (current === end) return path;

      for (const neighbor of graph.get(current) || []) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push([neighbor, [...path, neighbor]]);
        }
      }
    }

    return []; // no path
  }

  public getTravelInstructions(start: string, end: string): string[] {
    const path = this.findPath(start, end);
    if (path.length === 0) return ['No route found'];

    const steps: string[] = [];
    let currentLine = this.getCommonLine(path[0], path[1]);
    steps.push(`Start at ${path[0]} on ${currentLine}`);

    for (let i = 1; i < path.length - 1; i++) {
      const thisLine = this.getCommonLine(path[i], path[i + 1]);
      if (thisLine !== currentLine) {
        steps.push(`Get down at ${path[i]} and switch to ${thisLine}`);
        currentLine = thisLine;
      }
    }

    steps.push(`Arrive at ${path[path.length - 1]}`);
    return steps;
  }

  private getCommonLine(stationA: string, stationB: string): string {
    const linesA = this.findLinesOfStation(stationA);
    const linesB = this.findLinesOfStation(stationB);
    const common = linesA.find(line => linesB.includes(line));
    return common || 'Unknown Line';
  }

  public getAllStations(): string[] {
    const stationSet = new Set<string>();
    this.lines.forEach(line => {
      line.stations.forEach(station => stationSet.add(station));
    });
    return Array.from(stationSet).sort();
  }
}
