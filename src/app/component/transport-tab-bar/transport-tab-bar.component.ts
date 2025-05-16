import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-transport-tab-bar',
  templateUrl: './transport-tab-bar.component.html',
  styleUrls: ['./transport-tab-bar.component.css']
})
export class TransportTabBarComponent {
  @Input() activeTab: string = 'search';
  @Output() activeTabChange = new EventEmitter<string>();

  tabs = [
    { id: 'search', label: 'Search Destination' },
    { id: 'station', label: 'By Station' },
    { id: 'help', label: 'Help' }
  ];

  setTab(tabId: string) {
    this.activeTabChange.emit(tabId);
  }
}
