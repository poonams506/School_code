import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackBusesComponent } from './track-buses.component';

describe('TrackBusesComponent', () => {
  let component: TrackBusesComponent;
  let fixture: ComponentFixture<TrackBusesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TrackBusesComponent]
    });
    fixture = TestBed.createComponent(TrackBusesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
