import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentAnalyticComponent } from './payment-analytic.component';

describe('PaymentAnalyticComponent', () => {
  let component: PaymentAnalyticComponent;
  let fixture: ComponentFixture<PaymentAnalyticComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaymentAnalyticComponent]
    });
    fixture = TestBed.createComponent(PaymentAnalyticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
