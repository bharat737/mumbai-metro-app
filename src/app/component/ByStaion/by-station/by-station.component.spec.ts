import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ByStationComponent } from './by-station.component';

describe('ByStationComponent', () => {
  let component: ByStationComponent;
  let fixture: ComponentFixture<ByStationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ByStationComponent]
    });
    fixture = TestBed.createComponent(ByStationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
