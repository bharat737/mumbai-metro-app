import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-train',
  templateUrl: './train.component.html',
  styleUrls: ['./train.component.css']
})
export class TrainComponent {
  region: string = 'Maharashtra';
  selectedCity: string = '';

   @Input() cityName!: string;

  onRegionSelected(region: string): void {
    this.region = region;
    this.selectedCity = '';
  }

  selectCity(city: string): void {
    this.selectedCity = city;
  }

  ngOnChanges() {
  if (this.cityName?.toLowerCase() === 'mumbai') {
    this.region = 'Maharashtra';
    this.selectCity('mumbai');
  }
}

}
