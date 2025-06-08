import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-metro-search-history',
  templateUrl: './metro-search-history.component.html',
  styleUrls: ['./metro-search-history.component.css']
})
export class MetroSearchHistoryComponent {
  @Input() city: string = '';
  @Output() onSearchSelected = new EventEmitter<{ start: string; end: string; city: string }>();
  showHistoryList: boolean = false;
  @Input() history: { start: string; end: string; city: string }[] = [];

  get filteredHistory() {
    return this.history.filter(entry => entry.city.toLowerCase() === this.city.toLowerCase());
  }

  onSelect(search: { start: string; end: string; city: string }) {
    this.onSearchSelected.emit(search);
  }

  toggleHistory() {
    this.showHistoryList = !this.showHistoryList;
  }
}
