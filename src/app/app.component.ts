import { Component, OnInit } from '@angular/core';
import regionsData from '../assets/menu/regions.json'; // Adjust path if needed

interface City {
  name: string;
  icon: string;
  transports?: string[];
}

interface Region {
  state: string;
  icon: string;
  cities: City[];
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  regions: any[] = [];
  expandedStates: boolean[] = [];
  sidebarOpen = false;
  selectedCity: any = null;
  

  ngOnInit() {
    const data = regionsData as { regions: Region[] };
    this.regions = data.regions;
    this.expandedStates = Array(this.regions.length).fill(false);
  }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  closeSidebar() {
    this.sidebarOpen = false;
  }

  toggleState(index: number) {
    this.expandedStates[index] = !this.expandedStates[index];
  }

  selectCity(city: any) {
    this.selectedCity = city;
    this.sidebarOpen = false;
  }
}
