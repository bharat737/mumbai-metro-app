import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetroLineDetailComponent } from './metro-line-detail.component';

describe('MetroLineDetailComponent', () => {
  let component: MetroLineDetailComponent;
  let fixture: ComponentFixture<MetroLineDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MetroLineDetailComponent]
    });
    fixture = TestBed.createComponent(MetroLineDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
