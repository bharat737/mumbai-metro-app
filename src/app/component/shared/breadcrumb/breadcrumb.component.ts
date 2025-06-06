import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css']
})
export class BreadcrumbComponent {
  @Input() lineName!: string;
  @Input() stationName?: string;

  @Output() homeClick = new EventEmitter<void>();
  @Output() lineClick = new EventEmitter<void>();

  goHome() {
    this.homeClick.emit();
  }

  goLine() {
    this.lineClick.emit();
  }
}
