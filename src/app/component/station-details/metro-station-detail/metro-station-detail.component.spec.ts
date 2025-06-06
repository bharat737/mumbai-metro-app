import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetroStationDetailComponent } from './metro-station-detail.component';

describe('MetroStationDetailComponent', () => {
  let component: MetroStationDetailComponent;
  let fixture: ComponentFixture<MetroStationDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MetroStationDetailComponent]
    });
    fixture = TestBed.createComponent(MetroStationDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
