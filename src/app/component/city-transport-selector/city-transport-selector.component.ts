import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-city-transport-selector',
  templateUrl: './city-transport-selector.component.html',
  styleUrls: ['./city-transport-selector.component.css']
})
export class CityTransportSelectorComponent {
  @Input() city: any;
}
