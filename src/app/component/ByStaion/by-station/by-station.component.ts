import { Component, Input, OnInit } from '@angular/core';
import { MIN_SEARCH_LENGTH,AC,AP} from 'src/app/constant/app.constants';
import { MetroLine, Station, Direction,Interchange} from 'src/app/interface/metro.models';
import { MetroService } from 'src/app/services/metro.service';


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
  filteredStationSuggestions: string[] = [];

  

  // in parent component.ts
  // selectedDirection: { from: string; to: string; mode: 'metro' | 'train' } | null = null;
  selectedDirection: { from: string; to: string; mode: string } | null = null;

  //shared variable to child component
  @Input() alllines: any[] = [];
  @Input() interchanges: any[] = [];
  @Input() allstations: string[] = []; // Already exists

  constructor(private metroService: MetroService) {}

  ngOnInit(): void {
    this.lines = this.alllines;
    this.filteredLines = this.lines;
  }

onSearchChange(query: string): void {
  this.searchQuery = query;
 this.filteredStationSuggestions = [...new Set(
  this.allstations.filter(s =>
    s.toLowerCase().includes(query.toLowerCase())
  )
)];
}


  showLineDetails(line: any): void {
    alert(`Line: ${line.name}\nStations: ${line.stations.join(' -> ')}`);
  }

 getLineColor(name: string): string {
    return this.metroService.getLineColor(name);
  }

 filteredLineFilter(): MetroLine[] {
  this.searchedStation = this.searchQuery.trim();

  if (!this.searchedStation || this.searchedStation.length < MIN_SEARCH_LENGTH) {
    return this.lines;
  }

  return this.lines.filter(line =>
    line.stations.some(
      (station: any) =>
        station.name &&
        station.name.toLowerCase().includes(this.searchedStation.toLowerCase())
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

getDirection(stations: Station[], fromQuery: string, direction: 'forward' | 'backward'): string | null {
  const index = stations.findIndex(s =>
    s.name.toLowerCase().includes(fromQuery.toLowerCase())
  );
  if (index === -1) return null;

  const endStation =
    direction === 'forward' ? stations[stations.length - 1].name : stations[0].name;

  if (stations[index].name.toLowerCase() === endStation.toLowerCase()) {
    return null;
  }

  return endStation;
}



// Helper to check if any station matches search
hasMatchingStation(stations: any[]): boolean {
  return stations.some(st =>
    st.name.toLowerCase() === this.searchedStation.toLowerCase()
  );
}


// Helper to get matching stations for current search
getMatchingStations(line: any): string[] {
  if (!this.searchedStation) return [];
  return line.stations
    .filter((st: any) => st.name.toLowerCase() === this.searchedStation.toLowerCase())
    .map((st: any) => st.name);
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
