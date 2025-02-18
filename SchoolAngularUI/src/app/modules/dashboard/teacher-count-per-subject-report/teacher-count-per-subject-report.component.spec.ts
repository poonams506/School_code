import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherCountPerSubjectReportComponent } from './teacher-count-per-subject-report.component';

describe('TeacherCountPerSubjectReportComponent', () => {
  let component: TeacherCountPerSubjectReportComponent;
  let fixture: ComponentFixture<TeacherCountPerSubjectReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TeacherCountPerSubjectReportComponent]
    });
    fixture = TestBed.createComponent(TeacherCountPerSubjectReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
