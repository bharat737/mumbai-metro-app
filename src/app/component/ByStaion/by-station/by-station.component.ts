import { Component, OnInit } from '@angular/core';
import stationsData from '../../../../assets/data/metro/mumbai-metro.json';

interface MetroLine {
  name: string;
  line_name: string;
  status: 'AC' | 'AP';
  stations: string[];
}

@Component({
  selector: 'app-by-station',
  templateUrl: './by-station.component.html',
  styleUrls: ['./by-station.component.css']
})
export class ByStationComponent implements OnInit {
  lines: any[] = [];
  filteredLines: any[] = [];
  searchQuery: string = '';
  selectedLine: any = null;
  selectedStation: any = null;

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

 getLineColor(name: string): string {
    const colors: any = {
      'Blue Line': '#0000ff',
      'Yello Line': '#ffc107',
      'Yellow Line': '#ffc107',
      'Green Line': '#28a745',
      'Red Line': '#dc3545',
      'Orange Line': '#fd7e14',
      'Pink Line': '#e83e8c'
    };
    return colors[name] || '#6c757d';
  }

  filteredLineFilter(): MetroLine[] {
  if (!this.searchQuery) return this.lines;
  return this.lines.filter(line =>
    line.stations.some((station: string) =>
      station.toLowerCase().includes(this.searchQuery.toLowerCase())
    )
  );
}

getFullStatus(statusCode: string): string {
  switch (statusCode) {
    case 'AC':
      return 'Active';
    case 'UC':
      return 'Under Construction';
    case 'AP':
      return 'Approved for Construction';
    case 'PL':
      return 'In Plan';
    default:
      return statusCode;
  }
}

getStatusColor(statusCode: string): string {
  switch (statusCode) {
    case 'AC': return 'text-success';
    case 'UC': return 'text-warning';
    case 'AP': return 'text-danger';
    case 'PL': return 'text-secondary';
    default: return '';
  }
}


onLineClick(line: any): void {
  if (line.status === 'AC') {
    this.selectedLine = line; // ✅ store full object
    this.selectedStation = null;
  }
}

goBack(): void {
  this.selectedLine = null;
}
onBackToLine(): void {
  this.selectedStation = null;
}

onBackToHome(): void {
  this.selectedLine = null;
  this.selectedStation = null;
}

onStationClick(station: any): void {
  this.selectedStation = station;
}

}
