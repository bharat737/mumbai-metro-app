// metro.component.ts
import { Component, Input, OnChanges } from '@angular/core';
import { MetroService } from '../../services/metro.service';
import { ErrorMessages } from '../../constant/error.messages';
import { FEATURE_FLAGS } from '../../constant/feature-flags';

@Component({
  selector: 'app-metro',
  templateUrl: './metro.component.html',
  styleUrls: ['./metro.component.css']
})
export class MetroComponent implements OnChanges {
  startStation: string = '';
  loadSearchResult: boolean = false;
  endStation: string = '';
  routeDetails: string = '';
  stations: string[] = [];
  selectedCity: string = '';
  region: string = 'Maharashtra';
  activeTab: string = 'search';
  errorMessages : string = '';
  searchHistory: { start: string; end: string; city: string }[] = [];

  // This flag is used to conditionally show the history section in the template
  showHistory = FEATURE_FLAGS.ENABLE_METRO_HISTORY === 'Y';

  routeSegments: any[] = [];

  @Input() cityName: string | undefined;

  constructor(private metroService: MetroService) {}

  ngOnInit(): void {
  this.loadSearchHistory();
  }

  ngOnChanges(): void {
    if (this.cityName) {
      this.selectedCity = this.cityName.toLowerCase();
      this.metroService.loadCityData(this.selectedCity).then(() => {
        this.stations = this.metroService.getAllStations();
      });
    }
  }

  onHistorySelected(item: { start: string; end: string; city: string }) {
    this.startStation = item.start;
    this.endStation = item.end;
    this.selectedCity = item.city;
    this.onFindRoute();
  }

  onRegionSelected(region: string): void {
    this.region = region;
    this.selectedCity = '';
    this.routeDetails = '';
  }

  selectCity(city: string): void {
    this.selectedCity = city;
    this.routeDetails = '';
    this.metroService.loadCityData(city).then(() => {
      this.stations = this.metroService.getAllStations();
    });
  }

  onFindRoute(): void {
    this.loadSearchResult = true;

     if (!this.startStation || !this.endStation) {
    this.errorMessages = ErrorMessages.MISSING_STATIONS;
    return;
  }
    if (this.startStation === this.endStation) {
      this.errorMessages = ErrorMessages.SAME_START_END;;
      return;
    }

    if (this.startStation && this.endStation) {
      this.routeSegments = this.metroService.getVisualRoute(this.startStation, this.endStation) || [];
      if (this.routeSegments.length === 0) {
        this.errorMessages = ErrorMessages.NO_ROUTE_FOUND;
      } else {
        this.errorMessages = '';
        // this.routeDetails = `Route from ${this.startStation} to ${this.endStation}`;
         this.saveSearchToHistory(this.startStation, this.endStation, this.selectedCity);
        
        this.searchHistory.push({ start: this.startStation, end: this.endStation, city: this.selectedCity });

        // optional: prevent duplicates
          this.searchHistory = this.searchHistory.filter(
            (item, index, self) =>
              index === self.findIndex(t => t.start === item.start && t.end === item.end && t.city === item.city)
          );
      }

    } else {
      this.errorMessages = ErrorMessages.MISSING_STATIONS;
    }
  }

  saveSearchToHistory(start: string, end: string, city: string): void {
  const newEntry = { start, end, city };

  // Load existing
  const existing = JSON.parse(localStorage.getItem('metroSearchHistory') || '[]');

  // Filter out duplicate
  const filtered = existing.filter((entry: any) =>
    !(entry.start === start && entry.end === end && entry.city === city)
  );

  // Add new at start and keep max 2
  const updated = [newEntry, ...filtered].slice(0, 2);

  // Save to localStorage and update variable
  localStorage.setItem('metroSearchHistory', JSON.stringify(updated));
  this.searchHistory = updated;
}

loadSearchHistory(): void {
  const stored = JSON.parse(localStorage.getItem('metroSearchHistory') || '[]');
  this.searchHistory = stored;
}
}



