import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MIN_SEARCH_LENGTH } from 'src/app/constant/app.constants';

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
     if (this.start.length >= MIN_SEARCH_LENGTH) {
    this.startSuggestions = this.stations.filter(st =>
      st.toLowerCase().includes(this.start.toLowerCase())
    );
  }else{
     this.startSuggestions = [];
  }
  }

  onEndInputChange(): void {
    if (this.end.length >= MIN_SEARCH_LENGTH) {
    this.endSuggestions = this.stations.filter(st =>
      st.toLowerCase().includes(this.end.toLowerCase())
    );
  }else{
     this.endSuggestions = [];  
  }
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
