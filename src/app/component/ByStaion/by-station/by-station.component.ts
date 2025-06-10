import { Component, Input, OnInit } from '@angular/core';
import stationsData from '../../../../assets/data/metro/mumbai-metro.json';
import { MIN_SEARCH_LENGTH,AC,AP} from 'src/app/constant/app.constants';

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
  // selectedDirection: any = null;
  selectedStation: any = null;
  searchedStation: string = '';
  @Input() stations: string[] = []; // Already exists
  filteredStationSuggestions: string[] = [];

  // in parent component.ts
  // selectedDirection: { from: string; to: string; mode: 'metro' | 'train' } | null = null;
  selectedDirection: { from: string; to: string; mode: string } | null = null;


  ngOnInit(): void {
    this.lines = (stationsData as any).lines;
    this.filteredLines = this.lines;
  }

//  onSearchChange(): void {
//   const query = this.searchQuery.toLowerCase();

//   this.filteredLines = this.lines.filter(line =>
//     line.stations.some((station: string) =>
//       station.toLowerCase().includes(query)
//     )
//   );

//   this.filteredStationSuggestions = this.stations
//     .filter(st => st.toLowerCase().includes(query))
//     .slice(0, 5);
// }

onSearchChange(query: string): void {
  this.searchQuery = query;
  this.filteredStationSuggestions = this.stations
    .filter(s => s.toLowerCase().includes(query.toLowerCase()));
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
     this.searchedStation = this.searchQuery.trim();
   // Show all lines if search is empty or too short
  if (!this.searchedStation || this.searchedStation.length < MIN_SEARCH_LENGTH) {
    return this.lines;
  }
  // if (!this.searchQuery) return this.lines;
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
     this.selectedDirection = null; // sets breadcrumb to line only
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
  this.selectedDirection = null; 
}

onStationClick(station: any): void {
  this.selectedStation = station;
}
// getDirection(stations: string[], fromQuery: string, direction: 'forward' | 'backward'): string | null {
//   const index = stations.findIndex(s =>
//     s.toLowerCase().includes(fromQuery.toLowerCase())
//   );
//   if (index === -1) return null;

//   return direction === 'forward'
//     ? stations[stations.length - 1]
//     : stations[0];
// }

getDirection(stations: string[], fromQuery: string, direction: 'forward' | 'backward'): string | null {
  const index = stations.findIndex(s =>
    s.toLowerCase().includes(fromQuery.toLowerCase())
  );
  if (index === -1) return null;

  const endStation =
    direction === 'forward' ? stations[stations.length - 1] : stations[0];

  // ✅ Avoid repeating the same station
  if (stations[index].toLowerCase() === endStation.toLowerCase()) {
    return null;
  }

  return endStation;
}


// getDirection(stations: string[], station: string, direction: 'forward' | 'backward'): string {
//   const index = stations.indexOf(station);

//   if (index === -1) return '';

//   if (direction === 'forward' && index < stations.length - 1) {
//     return stations[stations.length - 1]; // Toward last station
//   } else if (direction === 'backward' && index > 0) {
//     return stations[0]; // Toward first station
//   }

//   return '';
// }

// Helper to check if any station matches search
hasMatchingStation(stations: string[]): boolean {
  if (!this.searchedStation || this.searchedStation.length < 3) return false;

  return stations.some(st =>
    st.toLowerCase().includes(this.searchedStation.toLowerCase())
  );
}

// Helper to get matching stations for current search
getMatchingStations(line: any): string[] {
  if (!this.searchedStation) return [];
  return line.stations.filter((st: string) =>
    st.toLowerCase().includes(this.searchedStation.toLowerCase())
  );
}

onStationSuggestionClick(station: string): void {
  this.searchQuery = station;
  this.filteredStationSuggestions = [];
  // Set searchedStation and refresh results
  this.searchedStation = station;
  // this.onSearchChange(station);

}

showRouteTimings(from: string, to: string, mode: string) {
  this.selectedLine = null;
  this.selectedStation = null;
  this.selectedDirection = { from, to, mode }; // sets breadcrumb to A → B
}
}
