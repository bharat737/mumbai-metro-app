import { Component, Input, OnChanges, OnInit } from '@angular/core';
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

  @Input() cityName: string | undefined;

  constructor(private metroService: MetroService) {}

  ngOnChanges(): void {
    if (this.cityName) {
      this.selectedCity = this.cityName.toLowerCase(); // sync input to internal variable
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
    if (this.startStation && this.endStation) {
      const directRoute = this.metroService.findDirectRoute(this.startStation, this.endStation);
      const startIndex = directRoute ? 2 : 1;
      const transferRoutes = this.metroService.findTransferRoutes(this.startStation, this.endStation, startIndex);
      this.routeDetails = [directRoute, transferRoutes].filter(Boolean).join('\n');
    } else {
      this.routeDetails = 'Please enter both start and end stations.';
    }
  }
}
