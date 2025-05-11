import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  stationsData: any = { lines: [], interchanges: [] };
  allStations: string[] = [];
  startStation = '';
  endStation = '';
  result: string[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get('assets/stations.json').subscribe((data: any) => {
      this.stationsData = data;
      const stationSet = new Set<string>();
      data.lines.forEach((line: any) => {
        line.stations.forEach((s: string) => stationSet.add(s));
      });
      this.allStations = Array.from(stationSet).sort();
    });
  }

  findLineForStation(station: string): string | null {
    for (const line of this.stationsData.lines) {
      if (line.stations.includes(station)) {
        return line.name;
      }
    }
    return null;
  }

  findRoute(): void {
    const start = this.startStation;
    const end = this.endStation;

    if (start === end) {
      this.result = ['Start and end stations cannot be the same.'];
      return;
    }

    const startLine = this.findLineForStation(start);
    const endLine = this.findLineForStation(end);

    if (!startLine || !endLine) {
      this.result = [`Could not find route.`];
      return;
    }

    if (startLine === endLine) {
      this.result = [`Take ${startLine} from ${start} to ${end}. No change needed.`];
      return;
    }

    // Find common interchange
    const interchange = this.stationsData.interchanges.find((i: any) =>
      i.lines.includes(startLine) && i.lines.includes(endLine)
    );

    if (interchange) {
      this.result = [
        `Take ${startLine} from ${start} to ${interchange.station}.`,
        `Change at ${interchange.station} to ${endLine}.`,
        `Take ${endLine} to ${end}.`
      ];
    } else {
      this.result = [`No direct interchange found between ${startLine} and ${endLine}.`];
    }
  }
}
