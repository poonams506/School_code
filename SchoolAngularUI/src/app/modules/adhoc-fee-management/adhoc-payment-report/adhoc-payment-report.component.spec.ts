import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdhocPaymentReportComponent } from './adhoc-payment-report.component';

describe('AdhocPaymentReportComponent', () => {
  let component: AdhocPaymentReportComponent;
  let fixture: ComponentFixture<AdhocPaymentReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdhocPaymentReportComponent]
    });
    fixture = TestBed.createComponent(AdhocPaymentReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
