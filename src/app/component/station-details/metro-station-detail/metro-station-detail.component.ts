import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-metro-station-detail',
  templateUrl: './metro-station-detail.component.html',
  styleUrls: ['./metro-station-detail.component.css']
})
export class MetroStationDetailComponent {
 @Input() lineName: string = '';
@Input() station: any = {};
@Output() homeClick = new EventEmitter<void>();
@Output() backToLine = new EventEmitter<void>();

goHome(): void {
  this.homeClick.emit();
}

goBackToLine(): void {
  this.backToLine.emit();
}

}
