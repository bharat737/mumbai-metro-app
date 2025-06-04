// app-sidebar.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './app-sidebar.component.html',
  styleUrls: ['./app-sidebar.component.css']
})
export class AppSidebarComponent {
  @Input() regions: any[] = [];
  @Input() sidebarOpen: boolean = false;
  @Input() expandedStates: boolean[] = [];
  @Input() selectedCity: any;

  @Output() citySelected = new EventEmitter<any>();
  @Output() stateToggle = new EventEmitter<number>();
  @Output() closeSidebar = new EventEmitter<void>();

  onToggleState(index: number) {
    this.stateToggle.emit(index);
  }

  onSelectCity(city: any) {
    this.citySelected.emit(city);
    this.closeSidebar.emit();
  }
}
