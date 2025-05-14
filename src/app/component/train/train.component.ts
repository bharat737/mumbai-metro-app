import { Component } from '@angular/core';

@Component({
  selector: 'app-train',
  templateUrl: './train.component.html',
  styleUrls: ['./train.component.css']
})
export class TrainComponent {
  region: string = 'Maharashtra';
  selectedCity: string = '';

  onRegionSelected(region: string): void {
    this.region = region;
    this.selectedCity = '';
  }

  selectCity(city: string): void {
    this.selectedCity = city;
  }
}
