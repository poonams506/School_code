import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcademicAssessmentReportComponent } from './academic-assessment-report.component';

describe('AcademicAssessmentReportComponent', () => {
  let component: AcademicAssessmentReportComponent;
  let fixture: ComponentFixture<AcademicAssessmentReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AcademicAssessmentReportComponent]
    });
    fixture = TestBed.createComponent(AcademicAssessmentReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
