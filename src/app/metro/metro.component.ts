import { Component, OnInit } from '@angular/core';
import { MetroService } from './metro.service';

@Component({
  selector: 'app-metro',
  templateUrl: './metro.component.html',
  styleUrls: ['./metro.component.css']
})
export class MetroComponent implements OnInit {
  startStation: string = '';
  endStation: string = '';
  routeDetails: string = '';
  stations: string[] = [];
  selectedCity: string = ''; // dynamic city toggle

  constructor(private metroService: MetroService) {}

  ngOnInit(): void {
    this.stations = this.metroService.getAllStations();
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

  selectCity(city: string): void {
    this.selectedCity = city;
    this.routeDetails = '';
    this.startStation = '';
    this.endStation = '';
  }
}
