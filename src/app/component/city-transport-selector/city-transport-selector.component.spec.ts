import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CityTransportSelectorComponent } from './city-transport-selector.component';

describe('CityTransportSelectorComponent', () => {
  let component: CityTransportSelectorComponent;
  let fixture: ComponentFixture<CityTransportSelectorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CityTransportSelectorComponent]
    });
    fixture = TestBed.createComponent(CityTransportSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
