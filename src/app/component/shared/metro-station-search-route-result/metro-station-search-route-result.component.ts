import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-metro-station-search-route-result',
  templateUrl: './metro-station-search-route-result.component.html',
  styleUrls: ['./metro-station-search-route-result.component.css']
})
export class MetroStationSearchRouteResultComponent {
  @Input() routeSegments: {
    line: string;
    direction: string;
    stations: string[];
    line_colour: string;
    color: string;
  }[] = [];
  @Input() errorMessages: any;
  getLineColor(line: string): string {
    const colorMap: any = {
      'Blue Line': '#0000ff',
      'Yello Line': '#ffc107',
      'Yellow Line': '#ffc107',
      'Green Line': '#28a745',
      'Red Line': '#dc3545',
      'Orange Line': '#fd7e14',
      'Pink Line': '#e83e8c'
    };
    return colorMap[line] || '#333';
  }

  slugify(station: string): string {
    return station.toLowerCase().replace(/\s+/g, '-');
  }

   get noRouteFound(): boolean {
    return !this.routeSegments || this.routeSegments.length === 0;
  }
}
