import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentKitPaymentAnalyticComponent } from './student-kit-payment-analytic.component';

describe('StudentKitPaymentAnalyticComponent', () => {
  let component: StudentKitPaymentAnalyticComponent;
  let fixture: ComponentFixture<StudentKitPaymentAnalyticComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentKitPaymentAnalyticComponent]
    });
    fixture = TestBed.createComponent(StudentKitPaymentAnalyticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
