import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassAttendanceReportComponent } from './class-attendance-report.component';

describe('ClassAttendanceReportComponent', () => {
  let component: ClassAttendanceReportComponent;
  let fixture: ComponentFixture<ClassAttendanceReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClassAttendanceReportComponent]
    });
    fixture = TestBed.createComponent(ClassAttendanceReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
