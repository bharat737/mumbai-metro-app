import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { MetroService } from 'src/app/services/metro.service';

@Component({
  selector: 'app-route-timings',
  templateUrl: './route-timings.component.html',
  styleUrls: ['./route-timings.component.css']
})
export class RouteTimingsComponent implements OnInit {
  @Input() from: string = '';
  @Input() to: string = '';
  @Output() back = new EventEmitter<void>();

  routeTitle: string = '';
  timings: {
  start: string;
  arrivalAtMid?: string;
  allStationTime: { [station: string]: string };
  }[] = [];
  platform: number = 0;
  directionFrom: string = '';
  directionTo: string = '';

  constructor(public metroService: MetroService) {}

  ngOnInit(): void {
    const routeLine = this.metroService.getLineByStations(this.from, this.to);
    if (!routeLine) return;

    const directions = (routeLine as any).directions || [];
    

    // const allStations = (routeLine as any).stations.map((s: any) => s.name);
    // const allStations = routeLine.stations;

    const allStations = this.metroService.reverseIfNeeded(this.to, routeLine.stations);

    const direction = directions.find((d: any) => {
  
      if (this.to != d.to) return false; // Ensure from/to are defined
      const names = allStations.map(s => s.name);
      const iDirFrom = names.indexOf(d.from);
      const iDirTo = names.indexOf(d.to);
      return d;
      // return (
      //   iFrom >= 0 &&
      //   iTo >= 0 &&
      //   ((iFrom >= iDirFrom && iTo <= iDirTo) || (iTo >= iDirFrom && iFrom <= iDirTo))
      // );
    });

    if (!direction) return;

    const frequency = direction.frequency_mins['weekday'];
    this.timings = this.metroService.generateTimingsForDirection(
        this.from,
        allStations,
        direction.start_time,
        frequency
    );
    this.platform = this.metroService.getRouteSummary(routeLine.line_name, direction.from, direction.to, 'weekday')?.platform || 0;
    this.directionFrom = direction.from;
    this.directionTo = direction.to;

    this.routeTitle = `Timings ${this.directionFrom} → ${this.directionTo} (Platform ${this.platform})`;
  }

  goBack(): void {
    this.back.emit();
  }
}
