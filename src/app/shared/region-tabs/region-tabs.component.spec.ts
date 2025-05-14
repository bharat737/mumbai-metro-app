import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegionTabsComponent } from './region-tabs.component';

describe('RegionTabsComponent', () => {
  let component: RegionTabsComponent;
  let fixture: ComponentFixture<RegionTabsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegionTabsComponent]
    });
    fixture = TestBed.createComponent(RegionTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
