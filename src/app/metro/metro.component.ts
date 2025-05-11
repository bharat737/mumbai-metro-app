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

  constructor(private metroService: MetroService) {}

  ngOnInit(): void {
    this.stations = this.metroService.getAllStations();
  }

  onFindRoute(): void {
    if (this.startStation && this.endStation) {
      const directRoute = this.metroService.findDirectRoute(this.startStation, this.endStation);
      const transferRoutes = directRoute ? '' : this.metroService.findTransferRoutes(this.startStation, this.endStation);
      this.routeDetails = [directRoute, transferRoutes].filter(Boolean).join('\n');
    } else {
      this.routeDetails = 'Please enter both start and end stations.';
    }
  }
}
