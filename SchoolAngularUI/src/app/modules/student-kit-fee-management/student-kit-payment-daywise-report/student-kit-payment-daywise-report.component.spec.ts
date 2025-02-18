import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentKitPaymentDaywiseReportComponent } from './student-kit-payment-daywise-report.component';

describe('StudentKitPaymentDaywiseReportComponent', () => {
  let component: StudentKitPaymentDaywiseReportComponent;
  let fixture: ComponentFixture<StudentKitPaymentDaywiseReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentKitPaymentDaywiseReportComponent]
    });
    fixture = TestBed.createComponent(StudentKitPaymentDaywiseReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
