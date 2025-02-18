import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherAvailabilityComponent } from './teacher-availability.component';

describe('TeacherAvailabilityComponent', () => {
  let component: TeacherAvailabilityComponent;
  let fixture: ComponentFixture<TeacherAvailabilityComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TeacherAvailabilityComponent]
    });
    fixture = TestBed.createComponent(TeacherAvailabilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
