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

  onStartChange(value: string) {
    this.startChange.emit(value);
  }

  onEndChange(value: string) {
    this.endChange.emit(value);
  }
}
