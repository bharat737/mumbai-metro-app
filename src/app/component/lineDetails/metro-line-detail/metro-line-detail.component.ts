import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { MetroService } from 'src/app/services/metro.service';


@Component({
  selector: 'app-metro-line-detail',
  templateUrl: './metro-line-detail.component.html',
  styleUrls: ['./metro-line-detail.component.css']
})
export class MetroLineDetailComponent implements OnInit {
  @Input() lineName: string = '';
  @Output() back = new EventEmitter<void>();

  line: any;
  interchangeStations: Set<string> = new Set();

  constructor(public metroService: MetroService) {}

  ngOnInit(): void {
    this.line = this.metroService.getLineByLineName(this.lineName);
    this.interchangeStations = new Set(this.metroService.getInterchangeStations());
  }

  goBack(): void {
    this.back.emit();
  }

  isInterchange(station: string): boolean {
    return this.interchangeStations.has(station);
  }

  getDirectionIcon(index: number): string {
    return index === 0 ? '↓' : '↑';
  }
}
