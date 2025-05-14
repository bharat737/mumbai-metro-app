import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-region-tabs',
  templateUrl: './region-tabs.component.html'
})
export class RegionTabsComponent {
  regions = ['Maharashtra', 'Delhi', 'Bangalore'];
  selectedRegion = 'Maharashtra';

  @Output() regionChange = new EventEmitter<string>();

  selectRegion(region: string) {
    this.selectedRegion = region;
    this.regionChange.emit(region);
  }
}
