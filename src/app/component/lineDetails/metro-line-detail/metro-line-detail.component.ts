import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { MetroService } from 'src/app/services/metro.service';

@Component({
  selector: 'app-metro-line-detail',
  templateUrl: './metro-line-detail.component.html',
  styleUrls: ['./metro-line-detail.component.css']
})
export class MetroLineDetailComponent implements OnInit {
  @Input() line: any; // ✅ Using full line object from parent
  @Output() back = new EventEmitter<void>();
  @Output() backToHome = new EventEmitter<void>();
  @Output() stationClick = new EventEmitter<any>();

  selectedStation: any = null;
  viewMode: 'line' | 'station' = 'line';
  interchangeStations: Set<string> = new Set();
  interchanges: any[] = [];

  constructor(public metroService: MetroService) {}

  ngOnInit(): void {
    this.interchangeStations = new Set(this.metroService.getInterchangeStations());
    this.interchanges = this.metroService.getInterchanges();
  }

  goBack(): void {
    this.back.emit();
  }

  goHome(): void {
    this.backToHome.emit();
  }

  onSelectStation(station: any): void {
    this.selectedStation = { name: station };
    this.viewMode = 'station';
    this.stationClick.emit(this.selectedStation);
  }

  onBackToLine(): void {
    this.viewMode = 'line';
  }

  isInterchange(station: string): boolean {
    return this.interchanges.some(interchange => interchange.station === station);
  }

  getDirectionIcon(index: number): string {
    return index === 0 ? '↓' : '↑';
  }

  getLineColor(name: string): string {
    const colors: any = {
      'Blue Line': '#0000ff',
      'Yello Line': '#ffc107',
      'Yellow Line': '#ffc107',
      'Green Line': '#28a745',
      'Red Line': '#dc3545',
      'Orange Line': '#fd7e14',
      'Pink Line': '#e83e8c'
    };
    return colors[name] || '#6c757d';
  }

  getLength(stationCount: number): string {
    const approxLength = (stationCount - 1) * 0.9;
    return `${approxLength.toFixed(1)} KM`;
  }
}
