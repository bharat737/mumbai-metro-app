import { Component, OnInit } from '@angular/core';
import stationsData from '../../../../assets/data/metro/mumbai-metro.json';

@Component({
  selector: 'app-by-station',
  templateUrl: './by-station.component.html',
  styleUrls: ['./by-station.component.css']
})
export class ByStationComponent implements OnInit {
  lines: any[] = [];
  filteredLines: any[] = [];
  searchQuery: string = '';

  ngOnInit(): void {
    this.lines = (stationsData as any).lines;
    this.filteredLines = this.lines;
  }

  onSearchChange(): void {
    const query = this.searchQuery.toLowerCase();
    this.filteredLines = this.lines.filter(line =>
      line.stations.some((station: string) =>
        station.toLowerCase().includes(query)
      )
    );
  }

  showLineDetails(line: any): void {
    alert(`Line: ${line.name}\nStations: ${line.stations.join(' -> ')}`);
  }
}
