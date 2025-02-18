import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassAttendanceStatusComponent } from './class-attendance-status.component';

describe('ClassAttendanceStatusComponent', () => {
  let component: ClassAttendanceStatusComponent;
  let fixture: ComponentFixture<ClassAttendanceStatusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClassAttendanceStatusComponent]
    });
    fixture = TestBed.createComponent(ClassAttendanceStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
