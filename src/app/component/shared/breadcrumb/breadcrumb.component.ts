import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css']
})
export class BreadcrumbComponent {
  @Input() lineName!: string;
  @Input() stationName?: string;
  @Input() direction: any;
  @Output() goHome = new EventEmitter<void>();
  @Output() backToLine = new EventEmitter<void>();
 
}
