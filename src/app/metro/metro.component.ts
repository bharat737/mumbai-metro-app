import { Component } from '@angular/core';
import { MetroService } from './metro.service';

@Component({
  selector: 'app-metro',
  templateUrl: './metro.component.html',
  styleUrls: ['./metro.component.css']
})
export class MetroComponent {
  startStation: string = '';
  endStation: string = '';
  instructions: string[] = [];

  constructor(private metroService: MetroService) {}

  getRoute() {
    this.instructions = this.metroService.getTravelInstructions(this.startStation, this.endStation);
  }

  stations = this.metroService.getAllStations();
}
