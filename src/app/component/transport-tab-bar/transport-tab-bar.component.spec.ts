import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransportTabBarComponent } from './transport-tab-bar.component';

describe('TransportTabBarComponent', () => {
  let component: TransportTabBarComponent;
  let fixture: ComponentFixture<TransportTabBarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TransportTabBarComponent]
    });
    fixture = TestBed.createComponent(TransportTabBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
