import { Component, Input, OnChanges } from '@angular/core';
import { TrainService } from '../../services/train.service';

@Component({
  selector: 'app-train',
  templateUrl: './train.component.html',
  styleUrls: ['./train.component.css']
})
export class TrainComponent implements OnChanges {
  @Input() cityName!: string;

  startStation: string = '';
  endStation: string = '';
  stations: string[] = [];
  routeDetails: string = '';
  activeTab: string = 'search';

  constructor(private trainService: TrainService) {}

  ngOnChanges(): void {
  if (this.cityName) {
    const city = this.cityName.toLowerCase(); // normalize
    this.trainService.loadStationData(city).then(() => {
      this.stations = this.trainService.getStations();
    });
  }
}


  onFindRoute(): void {
    if (this.startStation && this.endStation) {
      this.routeDetails = this.trainService.findRoute(this.startStation, this.endStation);
    } else {
      this.routeDetails = 'Please enter both start and end stations.';
    }
  }
}
