import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  regions: any[] = [];
  selectedCity: any = null;
  sidebarOpen = false;
  expandedStates: boolean[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<any>('assets/menu/regions.json').subscribe((data) => {
      this.regions = data.regions;
      this.expandedStates = new Array(this.regions.length).fill(false);
    });
  }

  toggleSidebar(event: Event) {
    event.stopPropagation();
    this.sidebarOpen = !this.sidebarOpen;
  }

  closeSidebar() {
    this.sidebarOpen = false;
  }

  toggleState(index: number) {
    this.expandedStates = this.expandedStates.map((v, i) => i === index ? !v : false);
  }

  selectCity(city: any) {
    this.selectedCity = city;
    this.closeSidebar();
  }
}
