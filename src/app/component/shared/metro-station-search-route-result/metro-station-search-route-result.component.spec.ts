import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetroStationSearchRouteResultComponent } from './metro-station-search-route-result.component';

describe('MetroStationSearchRouteResultComponent', () => {
  let component: MetroStationSearchRouteResultComponent;
  let fixture: ComponentFixture<MetroStationSearchRouteResultComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MetroStationSearchRouteResultComponent]
    });
    fixture = TestBed.createComponent(MetroStationSearchRouteResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
