import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-metro-station-detail',
  templateUrl: './metro-station-detail.component.html',
  styleUrls: ['./metro-station-detail.component.css']
})
export class MetroStationDetailComponent {
 @Input() lineName: string = '';
@Input() station: any = {};
}
