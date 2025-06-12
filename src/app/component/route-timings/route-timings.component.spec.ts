import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteTimingsComponent } from './route-timings.component';

describe('RouteTimingsComponent', () => {
  let component: RouteTimingsComponent;
  let fixture: ComponentFixture<RouteTimingsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RouteTimingsComponent]
    });
    fixture = TestBed.createComponent(RouteTimingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
