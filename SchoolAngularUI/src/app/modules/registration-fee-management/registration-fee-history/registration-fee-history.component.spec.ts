import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationFeeHistoryComponent } from './registration-fee-history.component';

describe('RegistrationFeeHistoryComponent', () => {
  let component: RegistrationFeeHistoryComponent;
  let fixture: ComponentFixture<RegistrationFeeHistoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistrationFeeHistoryComponent]
    });
    fixture = TestBed.createComponent(RegistrationFeeHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
