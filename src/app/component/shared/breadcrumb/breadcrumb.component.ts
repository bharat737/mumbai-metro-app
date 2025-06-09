import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css']
})
export class BreadcrumbComponent {
  @Input() lineName!: string;
  @Input() stationName?: string;

  @Output() goHome = new EventEmitter<void>();
  @Output() backToLine = new EventEmitter<void>();
  // @Input() direction?: { from: string; to: string; mode: string };
  // @Output() backToSearch = new EventEmitter<void>();
 
}
