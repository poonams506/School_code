import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassAttendanceMisssingReportComponent } from './class-attendance-misssing-report.component';

describe('ClassAttendanceMisssingReportComponent', () => {
  let component: ClassAttendanceMisssingReportComponent;
  let fixture: ComponentFixture<ClassAttendanceMisssingReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClassAttendanceMisssingReportComponent]
    });
    fixture = TestBed.createComponent(ClassAttendanceMisssingReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
