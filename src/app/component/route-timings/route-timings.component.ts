import { Component, Input, Output, EventEmitter } from '@angular/core';
import metroData from '../../../assets/data/timings/metro-route-timings.json';

@Component({
  selector: 'app-route-timings',
  templateUrl: './route-timings.component.html',
  styleUrls: ['./route-timings.component.css']
})
export class RouteTimingsComponent {
  @Input() from: string = '';
  @Input() to: string = '';
  @Input() mode: 'metro' | 'train' = 'metro';
  

  @Output() back = new EventEmitter<void>();
  timings: string[] = [];
  ngOnInit(): void {
    const matched = (metroData as any).routes.find(
      (route: any) =>
        route.from.toLowerCase() === this.from.toLowerCase() &&
        route.to.toLowerCase() === this.to.toLowerCase()
    );

    this.timings = matched ? matched.timings : [];
  }

  getTitle(): string {
    return `${this.mode === 'train' ? 'Train' : 'Metro'} Timings: ${this.from} → ${this.to}`;
  }

  goBack(): void {
    this.back.emit();
  }
}
