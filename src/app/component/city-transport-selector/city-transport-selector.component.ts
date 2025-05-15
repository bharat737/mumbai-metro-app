import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-city-transport-selector',
  templateUrl: './city-transport-selector.component.html',
  styleUrls: ['./city-transport-selector.component.css']
})
export class CityTransportSelectorComponent {
  @Input() city: any;

selectedMode: string | null = null;

selectMode(mode: string) {
  this.selectedMode = mode;
}
clearMode() {
  this.selectedMode = null;
}

getTransportIcon(mode: string): string {
  switch (mode) {
    case 'metro':
      return 'assets/icons/metro-icon.png';
    case 'local train':
      return 'assets/icons/train-icon.png';
    default:
      return 'assets/icons/default.png';
  }
}


}
