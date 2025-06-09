import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-station-input',
  templateUrl: './station-input.component.html',
  styleUrls: ['./station-input.component.css']
})
export class StationInputComponent {
  @Input() stations: string[] = [];

  @Input() start: string = '';
  @Input() end: string = '';

  @Output() startChange = new EventEmitter<string>();
  @Output() endChange = new EventEmitter<string>();

  startSuggestions: string[] = [];
  endSuggestions: string[] = [];

  onStartInputChange(): void {
    this.startSuggestions = this.stations.filter(st =>
      st.toLowerCase().includes(this.start.toLowerCase())
    );
  }

  onEndInputChange(): void {
    this.endSuggestions = this.stations.filter(st =>
      st.toLowerCase().includes(this.end.toLowerCase())
    );
  }

  selectStartStation(station: string): void {
    this.start = station; 
    this.startSuggestions = [];
    this.startChange.emit(station);
  }

  selectEndStation(station: string): void {
    this.end = station; 
    this.endSuggestions = [];
    this.endChange.emit(station);
  }
}
