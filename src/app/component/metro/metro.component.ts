import { Component, Input, OnChanges } from '@angular/core';
import { MetroService } from '../../services/metro.service';

@Component({
  selector: 'app-metro',
  templateUrl: './metro.component.html',
  styleUrls: ['./metro.component.css']
})
export class MetroComponent implements OnChanges {
  startStation: string = '';
  endStation: string = '';
  routeDetails: string = '';
  stations: string[] = [];
  selectedCity: string = '';
  region: string = 'Maharashtra';
  activeTab: string = 'search';

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
    if (this.startStation === this.endStation) {
      this.routeDetails = 'Start and End stations cannot be the same.';
      return;
    }

    if (this.startStation && this.endStation) {
      this.routeDetails = this.metroService.findRoute(this.startStation, this.endStation);
    } else {
      this.routeDetails = 'Please enter both start and end stations.';
    }
  }
}
