// metro.component.ts
import { Component, Input, OnChanges } from '@angular/core';
import { MetroService } from '../../services/metro.service';
import { ErrorMessages } from '../../constant/error.messages';

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

  routeSegments: any[] = [];

  @Input() cityName: string | undefined;

  constructor(private metroService: MetroService) {}

  ngOnChanges(): void {
    if (this.cityName) {
      this.selectedCity = this.cityName.toLowerCase();
      this.metroService.loadCityData(this.selectedCity).then(() => {
        this.stations = this.metroService.getAllStations();
      });
    }
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
      }
    } else {
      this.errorMessages = ErrorMessages.MISSING_STATIONS;
    }
  }
}
