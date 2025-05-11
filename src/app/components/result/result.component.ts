import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MetroService, Station } from '../../services/metro.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html'
})
export class ResultComponent implements OnInit {
  route: string[] = [];
  stations: Station[] = [];

  constructor(
    private routeService: ActivatedRoute,
    private metroService: MetroService
  ) {}

  ngOnInit() {
    this.metroService.getStations().subscribe(data => {
      this.stations = data;
      const start = this.routeService.snapshot.queryParamMap.get('start') || '';
      const end = this.routeService.snapshot.queryParamMap.get('end') || '';
      this.route = this.metroService.findRoute(start, end, this.stations);
    });
  }
}
