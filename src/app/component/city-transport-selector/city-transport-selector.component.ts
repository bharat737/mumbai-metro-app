import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-city-transport-selector',
  templateUrl: './city-transport-selector.component.html',
  styleUrls: ['./city-transport-selector.component.css']
})
export class CityTransportSelectorComponent {
  @Input() city: any;

  
  @Input() selectedMode: string | null = null;
  @Output() modeChange = new EventEmitter<string>();

  selectMode(mode: string) {
    this.selectedMode = mode;
    this.modeChange.emit(mode);
  }

  clearMode() {
    this.selectedMode = null;
     this.modeChange.emit('');
  }

  getTransportIcon(mode: string): string {
    switch (mode) {
      case 'metro':
        return 'assets/icons/metro-icon.png';
      case 'local train':
        return 'assets/icons/train-icon.png';
      case 'bus':
        return 'assets/icons/bus-icon.png';
      case 'monorail':
        return 'assets/icons/monorail-icon.png';
      default:
        return 'assets/icons/default-icon.png';
    }
  }
}
