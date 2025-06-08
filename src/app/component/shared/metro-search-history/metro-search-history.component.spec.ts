import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetroSearchHistoryComponent } from './metro-search-history.component';

describe('MetroSearchHistoryComponent', () => {
  let component: MetroSearchHistoryComponent;
  let fixture: ComponentFixture<MetroSearchHistoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MetroSearchHistoryComponent]
    });
    fixture = TestBed.createComponent(MetroSearchHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
