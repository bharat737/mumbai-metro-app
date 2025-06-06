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
    this.interchanges = this.metroService.getInterchanges(); // Add this method in service if needed
  }

  interchanges: any[] = [];


  goBack(): void {
    this.back.emit();
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
  // Approximate each stop as ~0.9 KM (adjust this as per real data)
  const approxLength = (stationCount - 1) * 0.9;
  return `${approxLength.toFixed(1)} KM`;
}

}
