import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-transport-card',
  templateUrl: './transport-card.component.html',
  styleUrls: ['./transport-card.component.css']
})
export class TransportCardComponent {
  @Input() mode!: string;
  @Output() cardClick = new EventEmitter<string>();

  onCardClick() {
    this.cardClick.emit(this.mode);
  }
}
