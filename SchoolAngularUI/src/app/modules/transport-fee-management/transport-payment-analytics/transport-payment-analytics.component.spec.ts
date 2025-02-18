import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransportPaymentAnalyticsComponent } from './transport-payment-analytics.component';

describe('TransportPaymentAnalyticsComponent', () => {
  let component: TransportPaymentAnalyticsComponent;
  let fixture: ComponentFixture<TransportPaymentAnalyticsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TransportPaymentAnalyticsComponent]
    });
    fixture = TestBed.createComponent(TransportPaymentAnalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
